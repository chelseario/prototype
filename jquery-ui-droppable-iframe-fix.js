$.ui.intersect = (function() {
	function isOverAxis( x, reference, size ) {
		return ( x >= reference ) && ( x < ( reference + size ) );
	}

	return function( draggable, droppable, toleranceMode ) {

		if ( !droppable.offset ) {
			return false;
		}

		var draggableLeft, draggableTop,
			x1 = ( draggable.positionAbs || draggable.position.absolute ).left,
			y1 = ( draggable.positionAbs || draggable.position.absolute ).top,
			x2 = x1 + draggable.helperProportions.width,
			y2 = y1 + draggable.helperProportions.height,
			l = droppable.offset.left,
			t = droppable.offset.top,
			r = l + droppable.proportions().width,
			b = t + droppable.proportions().height;
   
        alert('over here');
    	if (1)
    	{
            
        var iframeOffset = $(droppable.iframe).offset(),
      		iframeWidth = $(droppable.iframe).width(),
      		iframeHeight = $(droppable.iframe).height(),
      		iframeScrollTop = $(droppable.iframe).contents().scrollTop(),
      		iframeScrollLeft = $(droppable.iframe).contents().scrollLeft();
            alert(iframeOffset);
        
		    if (y1 < iframeOffset.top || x1 < iframeOffset.left || x1 + draggable.helperProportions.width > iframeOffset.left + iframeWidth || y1 + draggable.helperProportions.height > iframeOffset.top + iframeHeight) // outside iframe;
      	{
        	return false;
      	}
      	l = (iframeOffset.left + droppable.offset.left) - iframeScrollLeft;
      	r = l + droppable.proportions().width;
      	t = (iframeOffset.top + droppable.offset.top) - iframeScrollTop;
      	b = t + droppable.proportions().height;
    	}


		switch ( toleranceMode ) {
		case "fit":
			return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
		case "intersect":
			return ( l < x1 + ( draggable.helperProportions.width / 2 ) && // Right Half
				x2 - ( draggable.helperProportions.width / 2 ) < r && // Left Half
				t < y1 + ( draggable.helperProportions.height / 2 ) && // Bottom Half
				y2 - ( draggable.helperProportions.height / 2 ) < b ); // Top Half
		case "pointer":
			draggableLeft = ( ( draggable.positionAbs || draggable.position.absolute ).left + ( draggable.clickOffset || draggable.offset.click ).left );
			draggableTop = ( ( draggable.positionAbs || draggable.position.absolute ).top + ( draggable.clickOffset || draggable.offset.click ).top );
			return isOverAxis( draggableTop, t, droppable.proportions().height ) && isOverAxis( draggableLeft, l, droppable.proportions().width );
		case "touch":
			return (
				( y1 >= t && y1 <= b ) || // Top edge touching
				( y2 >= t && y2 <= b ) || // Bottom edge touching
				( y1 < t && y2 > b ) // Surrounded vertically
			) && (
				( x1 >= l && x1 <= r ) || // Left edge touching
				( x2 >= l && x2 <= r ) || // Right edge touching
				( x1 < l && x2 > r ) // Surrounded horizontally
			);
		default:
			return false;
		}
	};
})();
