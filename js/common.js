(function(window, $) {
    $(document).ready(function() {
        var listParent = $('.list-area');

        function listChecked(_list) {
            listParent.append(_list);
        }

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
        
        function listDelete(event) {
            event.stopPropagation();
            $(this).parent().remove();
        }

        function listAdd(_this) {
            var inputValue = $(_this).val(); 
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

        init();
        
    });
})(window, jQuery);