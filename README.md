# javascript-todolist
javascript 로 구현하는 to do list

#### 1. 리스트 클릭 시, 클릭 수 만큼 .check 요소가 prepend 됌. 클릭이 여러 번이 되도 한번만 .check 되게 변경 
<pre><code>
var _isCheck = false;

function listCheck() {
  if(_isCheck == true) return;
  _isCheck = true;
}
</code></pre>

#### 2. 위와 같이 작업했더니, 다른 리스트들이 추가 되었을 때, 그 리스트들까지 영향이 감. 그래서 코드 변경<br> .check 요소를 찾아서 없을 때만 추가함.
<pre><code>
function listCheck() {
    var isCheck = $(this).find('.check').length;

    if(!isCheck) {
        $(this).prepend('<span class="check">&#x2713;</span>');
    }
}
</code></pre>

#### 3. 리스트 한번 클릭 시, 체크 아이콘 추가되고 또 다시 클릭하면 사라지게 변경. toggle 처럼 
<pre><code>
// .check 가 없으면 추가하고, 있으면 remove 시킴.

function listCheck() {
    var isCheck = $(this).find('.check').length;
    if(!isCheck) {
        $(this).prepend('<span class="check">&#x2713;</span>');
    } else {
        $(this).find('.check').remove();
    };
}
</code></pre>

#### 4. 리스트 목록이 체크 되었을 경우, 체크된 항목은 리스트 하단으로 이동 
<pre><code>
// 선택한 요소를 부모 요소의 가장 맨 뒤에 넣기. 

function listChecked(_list) {
    var _parent = $('.list-area');
    _parent.append(_list);
}

function listCheck() {
    var isCheck = $(this).find('.check').length;
    if(!isCheck) {
        $(this).prepend('<span class="check">&#x2713;</span>');
        listChecked(this);
    } else {
        $(this).find('.check').remove();
    };
}
</code></pre>

#### 5. input에서 새로 리스트를 작성 했더니, 체크된 항목 리스트 하단에 새로 작성한 리스트들이 나옴. <br> 체크된 항목 리스트는 언제나 하단에 위치하게 변경. 
<pre><code>
// list 붙일 때 append 가 아닌, prepend()로 지정한 요소의 시작 부분에 삽입되게 코드를 변경 시킴.

function listChecked(_list) {
    var _parent = $('.list-area');
    _parent.append(_list);
}

function listCheck() {
    var isCheck = $(this).find('.check').length;
    if(!isCheck) {
        $(this).prepend('<span class="check">&#x2713;</span>');
        listChecked(this);
    } else {
        $(this).find('.check').remove();
    };
}

// append()는 지정한 요소의 뒤에 삽입, prepend()는 지정한 요소의 앞에 삽입 
</code></pre>

#### 6. 입력창에서 아무 입력없이 엔터했을 때, 빈 리스트 수정. 
<pre><code>
// 입력창에서 Enter 되었을 때, input의 값을 찾아 값이 비어있으면 하단 에러 문구 추가.

function listAdd(_this) {
    var inputValue = $(_this).val(); 
    var listParent = $('.list-area');
    var list = '<li class="list-item">'+
                    '<p>'+inputValue+'</p>'+
                    '<button type="button" class="btn-list-delete">&#x2715;</button>'+
                '</li>';
    var isError = $('.input-area').find('.error').length;

    if(inputValue == '') {               
        if(!isError) {
            // 중복된 에러 메시지 제어
            $('.input-area').append('<p class="error">Please enter a list!</p>');
        };
    } else {
        listParent.prepend(list);
        $('.input-area').find('.error').remove();
    };
}
</code></pre>

#### 7. 체크된 리스트 목록에서 체크를 풀었을 때, 체크된 목록보다 상단으로 올라가게 하기.
<pre><code>
function listCheck() {
    var isCheck = $(this).find('.check').length;
    if(!isCheck) {
        $(this).prepend('<span class="check">&#x2713;</span>');
        listChecked(this);
    } else {
        $(this).find('.check').remove();
        listParent.prepend($(this));
    };
}
</code></pre>

#### 8. 리스트 삭제 버튼(.btn-list-delete)을 클릭 했을 때, 리스트 목록 체크의 이벤트의 영향을 받아서 삭제 버튼이 작동하지 않는다. 그래서 이벤트 캡쳐(Event Capture)를 방지하는 코드가 필요했다.
<pre><code>
// 이벤트 캡쳐의 경우 최상위 요소의 이벤트만 동작시키고 하위 요소들로 이벤트를 전달하지 않는다. event.stopPropagation();

function listDelete(event) {
    event.stopPropagation();
    $(this).parent().remove();
}

function init() {
    $('.input-box').on('keypress', function(event) {
        if(event.keyCode == 13){
            listAdd(this);
            $(this).val('');
        }
    });

    $(document).on('click', '.btn-list-delete', listDelete);
    $(document).on('click', '.list-item', listCheck);
}
</code></pre>

#### 9. 동적 요소를 추가할 때, 추가된 요소에 이벤트를 주면 동작하지 않는다.<br>최초에 페이지를 로딩할 때 해당 태그가 없어서 바인딩 되지 못하기 때문이다. 그래서 대안으로 부모 객체에서 자식에게 이벤트를 지정해주는 방식을 사용할 수 있다.
<pre><code>
$('document').on('click', '.list-item', listCheck);
</code></pre>