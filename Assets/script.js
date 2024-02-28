$(document).ready(function () {
  // Display the current day at the top of the calendar
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
 
  // Function to create time blocks
  function createTimeBlocks() {
      var currentHour = dayjs().hour();
      $('.container-lg.px-5').empty();
      for (var hour = 9; hour <= 17; hour++) {
          // Create time block elements
          var timeBlock = $('<div>').addClass('row time-block');
          var hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(`${hour % 12 || 12}${hour < 12 ? 'AM' : 'PM'}`);
          var textarea = $('<textarea>').addClass('col-8 col-md-10 description');
          var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save"></i>');

          // Assign past, present, or future class based on current time
          if (hour < currentHour) {
              timeBlock.addClass('past');
          } else if (hour === currentHour) {
              timeBlock.addClass('present');
          } else {
              timeBlock.addClass('future');
          }

          // Append elements to time block
          timeBlock.append(hourCol, textarea, saveBtn);
          $('.container-lg').append(timeBlock);

          // Set id for each time block
          timeBlock.attr('id', `hour-${hour}`);

          // Load saved events
          textarea.val(localStorage.getItem(`hour-${hour}`));

          // Save button event listener
          $('.saveBtn').on('click', function () {
            const eventText = $(this).siblings('.description').val();
            const hour = $(this).parent().attr('id');
            
            localStorage.setItem(hour, eventText);
        
            // Show confirmation message
            showConfirmation(hour, eventText);
        });
        
        function showConfirmation(hour, eventText) {
            // Create confirmation message 
            var confirmationMessage = $(`
                <div class="confirmation-message">
                    Appointment added &#9989; <!-- This is the check emoji -->
                </div>
          `);

            // Style the confirmation message
            confirmationMessage.css({
                'position': 'absolute',
                'top': '5px',
                'left': '50%',
                'transform': 'translateX(-50%)',
                'background-color': 'lightgreen',
                'padding': '10px',
                'border-radius': '5px',
                'z-index': '1000',
                'display': 'none'
            });
        
            // Prepend the confirmation message to the container
            $('.container-lg.px-5').prepend(confirmationMessage);
         
        
            // Fade in the confirmation message
            confirmationMessage.fadeIn('slow', function() {
                setTimeout(function() {
                    confirmationMessage.fadeOut('slow', function() {
                        confirmationMessage.remove(); // Remove the message from the DOM
                    });
                }, 5000);
            });
        }
        
      }
  }


  // Initialize the time blocks on page load
  createTimeBlocks();

 $('html, body').animate({
  scrollTop: $(document).height() - $(window).height()
}, 'slow');
  
});
