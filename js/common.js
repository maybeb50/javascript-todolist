(function(window, $) {
    $(document).ready(function() {

        function listCheck() {
            var isCheck = $(this).find('.check').length;
            if(!isCheck) {
                $(this).prepend('<span class="check">&#x2713;</span>');
            } else {
                $(this).find('.check').remove();
            };
        }
        
        function listDelete() {
            $(this).parent().remove();
        }

        function listAdd(_this) {
            var inputValue = $(_this).val(); 
            var listParent = $('.list-area');
            var list = '<li class="list-item">'+
                          '<p>'+inputValue+'</p>'+
                          '<button type="button" class="btn-list-delete">&#x2715;</button>'+
                       '</li>';

            listParent.append(list);
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