$("#startbtn").click(function (e) {
  e.stopPropagation();
  $(".start-menu").toggleClass("active");
});

$(".start-menu").click(function (e) {
  e.stopPropagation();
});

$(document).click(function () {
  $(".start-menu").removeClass("active");
});

$(".category").click(function () {
  $(".category").removeClass("active");
  $(this).addClass("active");
});

let index = 1;
let topval = 50;
let leftval = 390;
$(".app").click(function () {
  const url = $(this).data("url");
  const icon = $(this).data("icon");
  const appID = $(this).data("id");
  const title = $(this).data("title");

  let $win;
  let $taskBtn;

  let $existingWin = $(`.container[data-id="${appID}"]`);

  if ($existingWin.length) {
    $win = $existingWin;
    $win.show().css("z-index", ++index);
    return;
  }

  $win = $(`
    <div class="container" data-id="${appID}" style="
      top:${topval}px;
      left:${leftval}px;
      position:absolute;
      z-index:${++index};
    ">
    
        <div class="tophandle">
            <div>${title}</div>
            <div>
            <i class="fa-solid fa-window-minimize"></i>
            <i class="fa-solid fa-window-maximize"></i>
            <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
       
            <iframe src="${url}"></iframe>
       
    </div>
   
  `).appendTo(".desktop");

  $taskBtn = $(
    `<i class="${icon} task-btn" data-id="${appID}" style="color:#fff;background-color:#414140b6; font-size:20px;"></i>`
  ).appendTo(".left");

  topval += 10;
  leftval += 20;
  $win
    .draggable({
      containment: "parent",
      handle: ".tophandle",

      start: function () {
        $win.find("iframe").css({
          "pointer-events": "none",
        });
      },
      stop: function (event, ui) {
        $win.find("iframe").css({
          "pointer-events": "auto",
        });
      },
    })
    .resizable({
      containment: "parent",

      minHeight: 250,
      minWidth: 500,

      start: function (event, ui) {
        $win.find("iframe").css({
          "pointer-events": "none",
        });
      },
      stop: function (event, ui) {
        $win.find("iframe").css({
          "pointer-events": "auto",
        });
      },
    });

  $win.on("mousedown", function (e) {
    if (!$(e.target).hasClass("ui-resizable-handle")) {
      $(this).css("z-index", ++index);
    }
  });

  $win.find(".fa-window-maximize").click(() => {
    $win.toggleClass("maximize");
  });

  $win.find(".fa-window-minimize").click(() => {
    $win.hide();
  });

  $win.find(".fa-xmark").click(() => {
    $(`.task-btn[data-id="${appID}"]`).remove();
    $win.remove();
  });

  $taskBtn.click(() => {
    $win.show().css("z-index", ++index);
  });
});

$(document).on("contextmenu", ".desktop", function (e) {
  e.preventDefault();
  const menu = $(".context");
  const offsetX = 5;
  const offsetY = -30;
  menu.css({
    top: e.pageY + offsetY + "px",
    left: e.pageX + offsetX + "px",
    display: "block",
    zIndex: index + 1000,
  });
});
