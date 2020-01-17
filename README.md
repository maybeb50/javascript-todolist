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


