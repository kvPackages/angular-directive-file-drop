angular
  .module('ngFileDrop', [])

  .directive('fileDrop', function(){
    return {
      	restrict: 'A',
      	transclude: true,
      	scope: {
        	onDrop: '&',
        	dragOverClass: '@'
      	},

    	link: function(scope, element, attrs, ctrl, transclude){
        
	      	var helper = {
	            init: function(){
	                var dropArea = element;

	                var handleDrag = function(e){
	                    e.preventDefault();
	                    e.stopPropagation();

	                    if(e.type === 'dragover'){
	                        dropArea.addClass(scope.dragOverClass);
	                    } else {
	                        dropArea.removeClass(scope.dragOverClass);
	                    }
	                };

	                var handleFileSelect = function(e){
	                    handleDrag(e);
	                    scope.onDrop({ files: (e.target.files || e.dataTransfer.files) });
	                };

	                dropArea.bind('dragover', handleDrag);
	                dropArea.bind('dragleave', handleDrag);
	                dropArea.bind('drop', handleFileSelect);
	            }
	        };

	        if(window.File && window.FileList && window.FileReader){
	            helper.init();
	            transclude(function(clone){
	                element.append(clone);  
	            });
	        }
        }
    };
});
