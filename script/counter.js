// ページが読み込まれたら実行
window.onload = function() {

	// オブジェクトと変数の準備
	var count_disp = document.getElementById("disp_count");  
	var count_up_btn = document.getElementById("btn_count_up");
	var reset_btn = document.getElementById("btn_reset");
	var openTwitter = document.getElementById("openTwitter");
	var count_value = 0;

	var text1 = "夏休み合作で「yee」と言った回数は…『";
	var text2 = "回』！";
	var url = "0724.tokyo/summer/2020/";
	var hash = "sm37107459";

	// yeeボタンクリック処理
	count_up_btn.onclick = function (){
		count_value += 1;
		count_disp.innerHTML = count_value;
	};
	// yeeボタンのマウスダウン処理
	count_up_btn.onmousedown = function() {
		count_up_btn.style.backgroundColor = "#4444ff";
	}
	// yeeボタンのマウスアップ処理
	count_up_btn.onmouseup = function() {
		count_up_btn.style.backgroundColor = "";
	}
	// 数え直しボタンのクリック処理
	reset_btn.onclick = function (){
		count_value = 0; count_disp.innerHTML = count_value;
	}
	// 数え直しボタンのマウスダウン処理
	reset_btn.onmousedown = function() {
		reset_btn.style.backgroundColor = "#ff4444";
	}
	// 数え直しボタンのマウスアップ処理
	reset_btn.onmouseup = function() {
		reset_btn.style.backgroundColor = "";
	}
	// 確定ボタンクリック処理
	openTwitter.onclick = function (){
		window.open("https://twitter.com/intent/tweet?text="+text1+count_value+text2+"&url="+url+"&hashtags="+hash,"_blank");		
	};
	// 確定ボタンのマウスダウン処理
	openTwitter.onmousedown = function() {
		openTwitter.style.backgroundColor = "#4444ff";
	}
	// 確定ボタンのマウスアップ処理
	openTwitter.onmouseup = function() {
		openTwitter.style.backgroundColor = "";
	}
}