
//$(function() {
//    //$('input[name="daterange"]').daterangepicker({
//    //    opens: 'left',
//    //    minDate: new Date(),
//    //    maxDate: new Date("2021","06","20")
//    //}, function (start, end, label) {
//    //    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
//    //});
//    $("#datepicker").datepicker({
//        dateFormat: "yy-mm-dd"
//    });

//});

$(function () {
    var zz = 0;
    $("#tglawal").flatpickr(
        {
            minDate: "today",
            onChange: function (selectedDates, dateStr, instance) {
                console.log(dateStr);
                var tgl = new Date(dateStr).fp_incr(3);
         
                $("#tglakhir").val(tgl.toISOString().substring(0, 10))
            }
        }
    );
    
});


function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});




