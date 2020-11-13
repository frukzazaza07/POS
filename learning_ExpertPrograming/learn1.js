// ทำให้ช่อง input text ขยับ
$('#inputText').css("backgroundColor", "red"); //กรณีผิด set ช่องให้สีแดง
setTimeout(
    function test() {

        if (timer < Math.PI * 8) {
            var x = Math.sin(timer) * 80 * (1.0 / timer); //สูตรทำให้ขยับ
            $('#inputText').css("margin-left", x + "px");
            var color = Math.round(255 * (timer / (Math.PI * 8))); //ทำสีเปลี่ยน
            $('#inputText').css("backgroundColor", "rgb(255," + color + "," + color + ")");
            timer += 0.07;
            setTimeout(test, 1);
        } else {
            $('#inputText').css("margin-left", 0 + "px");
            timer = 0;
        }
    }
)