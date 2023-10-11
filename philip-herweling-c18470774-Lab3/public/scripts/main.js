
$(document).ready(function(){

    $('.deleteButton').on('click', function(e){
        e.preventDefault();
        $target = $(e.target);
        const colourID = $target.attr('colourID');

        // using Ajax to make the Delete REST call
        $.ajax({
            type: 'DELETE', 
            url: '/colours/' + colourID,

            success: function (response){
                console.log(response);
                window.location.href = '/colours';
            }, 
            error: function(err){
                console.log(err);
            }
        });
    });

    $('#setColour').on('click', function(e){
        e.preventDefault();

        $target = $(e.target);
        const colourID = $target.attr('colourID');

        $.ajax({
            type: 'POST',
            url: '/colours/setColour/' + colourID,

            success: function (response){
                console.log(response);
                $('#colourMsg').show().delay(5000).fadeOut();
            }, 
            error: function (err){
                console.log(err)
            }
        });
    });

    $('#createSubmit').on('click', function(e){
        e.preventDefault();

        // Make the REST Post call
        $.ajax({
            type: 'POST',
            url: '/colours',
            data: $('#createForm').serialize(),

            success: function (response){
                $('#msg').show().delay(5000).fadeOut();
                $('#name').val('');
                $('#hex').val('');
                $('#r').val('');
                $('#g').val('');
                $('#b').val('');
                $('#h').val('');
                $('#s').val('');
                $('#l').val('');
            }, 
            error: function(err){
                console.log('Error')
                console.log(err);
            }
        });
    });

    $('#updateSubmit').on('click', function(e){
        e.preventDefault();

        // Retrieve the ID of the Colour
        const colourID = $('#id').val();
        console.log(colourID);

        // Make the REST PUT call
        $.ajax({
            type: 'PUT',
            url: '/colours/' + colourID,
            data: $('#updateForm').serialize(),

            success: function (response){

                // Check which response message has been returned
                if(response.message == 'New Colour Created') {
                    $('#upcreatemsg').show().delay(5000).fadeOut();
                } else if (response.message == 'Existing Colour Updated') {
                    $('#upmsg').show().delay(5000).fadeOut();
                }

                window.location.href = '/colours/' + colourID;
    
            },
            error: function (err){
                console.log(err);
            }
        });
    });

    $('#coloursTable').DataTable({
        columns: [
            { title: 'Colour ID' },
            { title: 'Colour Name' },
            { title: 'View Details' }
        ]
    });

});
