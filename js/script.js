let game;
let canvas;
let addManually = -1;

function resizeWindow() {

    const $mainPanel = $(".main-panel");

    canvas.setWidth($mainPanel.width());
    canvas.setHeight($(window).height() - $mainPanel.offset().top - 16);

    $(".side-panel .card").height(canvas.canvas.height);
}

$(function () {
    game = new Game();

    canvas = new Canvas("canvas");

    canvas.loadAsset(GameRule.PAPER, "images/paper.png");
    canvas.loadAsset(GameRule.ROCK, "images/rock.png");
    canvas.loadAsset(GameRule.SCISSOR, "images/scissor.png");
    canvas.loadAsset(GameRule.LIZARD, "/images/lizard.png");
    canvas.loadAsset(GameRule.SPOCK, "/images/spock.jpg");
    

    EventEmitter.on("canvas-mouse-up", (mouse) => {

        if(addManually == -1){
            return;
        }

        game.addHandManually(mouse.x, mouse.y, addManually);
    });

    $(window).resize(resizeWindow).trigger("resize");

    game.init(canvas, Settings.particles);

    function repeatOften() {

        game.draw(canvas);

        requestAnimationFrame(repeatOften);
    }

    requestAnimationFrame(repeatOften);

    $("#btn-play-stop").click(function () {

        game.playOrStop();

        $(this).find("span").html(game.isRunning ? "Stop" : "Start");

        $(this).find("i")
            .toggleClass("bi-play-fill", !game.isRunning)
            .toggleClass("bi-stop-fill", game.isRunning);
    });

    $("input[name=speed").change(function () {
        Settings.speed = Number(this.value);
    });

    $("#particles").change(function () {
        Settings.particles = Number(this.value);
        game.init(canvas, Settings.particles);
    });

    $("#radius").change(function () {
        Settings.radius = Number(this.value);
    }).trigger("change");
    
    $(".add-hand").click(function () {
        addManually = Number($(this).data("hand"));
    });

});
