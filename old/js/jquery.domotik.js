(function($){
    $.Domotik = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("Domotik", base);
        
        base.init = function(){
            base.options = $.extend({},$.Domotik.defaultOptions, options);
            
            // Put your initialization code here
        };
        
        // Sample Function, Uncomment to use
        base.switchOn = function(address_){
        						var device = {address: address_};
								$.post("command.php?action=on", {
									device: device
								});
        };
        
        // Run initializer
        base.init();
    };
    
    $.Domotik.defaultOptions = {
        executor: "command.php",
        observator: "observator.php"
    };
    
    $.fn.domotik = function(options){
        return this.each(function(){
            (new $.Domotik(this, options));
        });
    };
    
})(jQuery);