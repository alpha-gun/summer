// ページが読み込まれたら実行
window.onload = function() {

// ランダムな数の配列の材料
// DINOSAURI配列
const initialArray = [
	'変化',
	'成功',
	'楽しい',
	'良い',
	'fake',
	'生物',
	'2000',
	'USA',
	'FAN',
	'パパ',
	'クール',
	'迷った',
	'曖昧',
	'ﾂｲｰﾄ',
	'学校',
	'カレー',
	'適当',
	'東京',
	'夏休み',
	'合作',
	'ゲット',
	'Dingo',
	'SAD',
	'9分',
	'BB',
	].filter(x => x !== 0);

// シャッフル関数
const createShuffledArray = (array) => {
	const tempArray = array
	for (let i = tempArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const tmp = tempArray[i];
		tempArray[i] = tempArray[j];
		tempArray[j] = tmp;
	}
	return tempArray
}

// ランダムな数の配列
const shuffledArray = createShuffledArray(initialArray);

// 2次元配列に分割する関数
const arrayChunk = ([...array], size) => {
	return array.reduce((acc, value, index) => index % size ? acc : [...acc, array.slice(index, index + size)], []);
}

// 画面に表示する2次元配列
const dataSheet = arrayChunk(shuffledArray, 5).filter((x, i) => i < 5);

// 結果表
let resultSheet = [...new Array(5)].map(() => Array(5).fill(false));

// 行のタグをつくる
const createTd = (rowArray, rowIndex) => {
	return rowArray.map((x, i) => `<td class="isclicked_${resultSheet[rowIndex][i]}" id="${rowIndex}_${i}">${x}</td>`);
};

// 全体のタグをつくる
const createTbody = (array) => array.map((x, i) => `<tr>${createTd(x, i).join('')}</tr>`);

// 画面に描画する
const showTagsToTargetId = (targetId, tags) => {
	document.getElementById(targetId).innerHTML = tags;
};

// 指定要素のid取得
const getId = (e) => e.target.id;

// 0_0形式のidを数値の配列にする
const getIndexFromId = (id) => id.split('_').map(Number);

// 指定インデックスのfalseとtrueを更新する
const updateResultSheet = (resultArray, targetIndexArray) => {
	const newResultArray = [...resultArray];
	newResultArray[targetIndexArray[0]][targetIndexArray[1]] = !newResultArray[targetIndexArray[0]][targetIndexArray[1]]
	return newResultArray;
}

var count_disp = document.getElementById("bingo_count");
var count_value = 0;

// ビンゴ数のチェック
const bingoCheck = () => {
	count_value = 0;
	for (let p=0 ; p<5 ; p++){
		// 行
		if (resultSheet[p][0] == true && resultSheet[p][1] == true && resultSheet[p][2] == true && resultSheet[p][3] == true && resultSheet[p][4] == true){
			count_value += 1;
		};
		// 列
		if (resultSheet[0][p] == true && resultSheet[1][p] == true && resultSheet[2][p] == true && resultSheet[3][p] == true && resultSheet[4][p] == true){
			count_value += 1;
		};
	}
	// 斜め左上
	if (resultSheet[0][0] == true && resultSheet[1][1] == true && resultSheet[2][2] == true && resultSheet[3][3] == true && resultSheet[4][4] == true){
		count_value += 1;
	};
	// 斜め右上
	if (resultSheet[0][4] == true && resultSheet[1][3] == true && resultSheet[2][2] == true && resultSheet[3][1] == true && resultSheet[4][0] == true){
		count_value += 1;
	};
	count_disp.innerHTML = count_value;
}

// 画面に表示される2次元配列表の更新と更新時のクリックイベント登録
const updateGame = () => {
	// 表示を更新
	showTagsToTargetId('tbody', createTbody(dataSheet).join(''));
	// クリックイベント登録
	[...document.getElementsByTagName('td')].forEach((x) => {
		x.addEventListener('click', (e) => {
			// 結果表を更新
			resultSheet = updateResultSheet(resultSheet, getIndexFromId(getId(e)));
			updateGame();
			bingoCheck();
		})
	})
}

// 初回ゲーム開始
dataSheet[2][2] = 'Yee';
resultSheet[2][2] = true;
updateGame();

// Tweet用
var openTwitter = document.getElementById("openTwitter");
var text1 = "夏休み合作のDINGOゲームで『";
var text2 = "回』ビンゴしました！";
var url = "https://0724.tokyo/summer/";
var hash = "sm39084681";

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
