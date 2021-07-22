setInterval(function () { loadNotif() }, 10000);
loadNotif()
function loadNotif() {
    $.ajax({
        url: "/User/GetAllLeaveEmployee/" + $("#nikHidden").val()
    }).done((result) => {

        if (result.length > 0) {
            var temp = `<span class="position-absolute top-40 start-100 translate-middle-x badge rounded-pill bg-danger" style="margin-left: -30px;margin-bottom: 0px;margin-top: -3px; font-size:10px;">
                                                    ${result.length}
                                                </span>`
            var temp22 = ``;
            $.each(result, function (key, val) {
                temp22 += `<li>
                                                    <a class="dropdown-item" href="/User/LeaveResponse">
                                                        <div class="row">
                                                            <div class="col-7">
                                                                <span > <span class="fw-bold text-break" style="font-size:14px;">${val.firstName}</span><br /> <span class="fw-normal text-muted" style="font-size:12px;">Department ${val.departmentName}</span></span>
                                                            </div>
                                                            <div class="col">
                                                                <span class="text-danger" style="font-size:10px; float:right;">${val.leaveType}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>`;
            })
            $("#isi").html(temp22);
            $("#notif").html(temp);
        } else {
            $("#isi").html('<li><a class="dropdown-item">No notification available</a></li>');
            $("#notif").html("");
        }
    })
}

let d = new Date();
let hours = d.getFullYear();
document.getElementById("year").innerHTML = hours;