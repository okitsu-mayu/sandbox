class Enemy {
	constructor(x, y, angle, kind) {
		this.kind = kind; // 敵の種類
		this.BULLET_NUM = 3; // 敵の最大弾数
		this.bullet = Array(this.BULLET_NUM); // 弾の変数
		for(var i = 0;i < 5;i++) {
			this.bullet[i] = new Bullet();
		}
		this.x = x; // X座標
		this.y = y; // Y座標
		this.width = 32; // 幅
		this.height = 32; // 高さ
		this.angle = angle; // 角度
		this.spd = 3; // 速度
		this.cnt = 0; // カウンタ
	}
	
		getBulletNum() { // 発射されていない弾を検索
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(!this.bullet[i].exist) {
				return i;
			}
		}
		return -1;
	}
	
	shot() {
		if(this.cnt % 20 == 0) { // 20カウントずつ発射
			var num = this.getBulletNum(); // 発射されてない弾の番号を取得
			if(num != -1) {
				//	弾を登録
				this.bullet[num].enter(this.x, this.y, 4, 4, this.angle, 5);
			}
		}
		//	発射された弾を更新
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(this.bullet[i].exist) {
				this.bullet[i].move();
			}
		}
		//	カウンタを更新
		this.cnt++;
	}
	
	
	move() {
		//	X・Y座標を更新
		this.x += Math.cos(this.angle) * this.spd;
		this.y += Math.sin(this.angle) * this.spd;
		
		//	壁に当たったら跳ね返る
		if(this.x < this.width / 2 || this.x > WIDTH - this.width / 2) {
			var r = this.angle - Math.PI / 2;
			this.angle = this.angle - 2 * r;
			this.spd *= 1.002;
		}
		else if(this.y < this.height / 2 || this.y > HEIGHT - this.height / 2) {
			var r = this.angle - Math.PI * 2;
			this.angle = this.angle - 2 * r;
			this.spd *= 1.002;
		}
	}
	draw(context) {
		//	敵を描画
		var img01 = new Image();
		
			
		switch(this.kind) {
			 case 0: img01.src = "komiya.png"; break;
			 case 1: img01.src = "kohei.png"; break;
			 case 2: img01.src = "mami.png"; break;
			 case 3: img01.src = "mayu.png"; break;
		}
		context.drawImage(img01, this.x - this.width / 2, this.y - this.height / 2,this.width, this.height);

		//	敵の弾を描画
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(this.bullet[i].exist) {
				this.bullet[i].draw(context);
			}
		}
	}
}

class Bullet {
	constructor() {
		this.exist = false; // 存在フラグ
		this.x = 0; // X座標
		this.y = 0; // Y座標
		this.width = 0; // 幅
		this.height = 0; // 高さ
		this.angle = 0; // 角度
		this.spd = 0; // 速度
	}
		enter(x, y, width, height, angle, spd) {
		this.exist = true; // 存在フラグをオンにする
		this.x = x; // X座標を設定
		this.y = y; // Ｙ座標を設定
		this.width = width; // 幅を設定
		this.height = height; // 高さを設定
		this.angle = angle; // 角度を設定
		this.spd = spd; // 速度を設定
	}
	move() {
		//	X・Y座標を更新
		this.x += Math.cos(this.angle) * this.spd;
		this.y += Math.sin(this.angle) * this.spd;
		
		//	画面外に出たら消す
		if(this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT) {
			this.exist = false;
		}
	}
	draw(context) {
		//	弾を描画
		context.fillStyle = "rgb(255, 255, 0)";
		context.fillRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
	}
}
class Player {
	constructor() {
		this.cnt = 0; // カウンタ
		this.residue = 3; // 残基
				this.deffect = false; // ダメージエフェクトのフラグ
		this.x = WIDTH / 2; // X座標
		this.y = HEIGHT * 3 / 4; // Y座標
		this.width = 24; // 幅
		this.height = 36; // 高さ
		this.BULLET_NUM = 5; // 弾の最大発射数
		this.bullet = Array(this.BULLET_NUM);
		for(var i = 0;i < this.BULLET_NUM;i++) {
			this.bullet[i] = new Bullet();
		}
	}

	getBulletNum() {	//	発射されていない弾を検索
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(!this.bullet[i].exist) {
				return i;
			}
		}
		return -1;
	}
	
	shot(key) {
		var num; // 発射できる弾の番号
		if(key[KEY_Z] == 1) {
			num = this.getBulletNum(); // 弾の番号を取得
			if(num != -1) {
				//	弾を登録
				this.bullet[num].enter(this.x, this.y, 4, 36, -Math.PI / 2, 10);
				//	Zキー状態を更新
				key[KEY_Z]++;
			}
		}
	}
	
	move(key) {
		var diagonal = 1.0; // 斜め方向への補正値
		var hori = false, vert = false; // 横・縦移動のフラグ
		
		//	横移動が行われた場合
		if(key[KEY_RIGHT] != 0 || key[KEY_LEFT] != 0) {
			hori = true;
		}
		//	縦移動が行われた場合
		if(key[KEY_UP] != 0 || key[KEY_DOWN] != 0) {
			vert = true;
		}
		//	横・縦移動が行われた場合（斜め移動）
		if(hori && vert) {
			diagonal = Math.sqrt(2.0); // 補正値をルート2にする
		}
		
		//	移動後の座標を計算
		var mx = this.x + (key[KEY_RIGHT] - key[KEY_LEFT]) * 6 / diagonal;
		var my = this.y + (key[KEY_DOWN] - key[KEY_UP]) * 6 / diagonal;
		
		//	画面外に飛び出ていなければX座標を更新する
		if(!(mx < this.width / 2 || mx > WIDTH - this.width / 2)) {
			this.x = mx;
		}
		if(!(my < this.height / 2 || my > HEIGHT - this.height / 2)) {
			this.y = my;
		}
	}
	
	draw(context) {
		//	プレイヤーを描画
		//	ダメージエフェクトで1カウントずつ交互に表示・非表示を切り替える
		if(!(this.deffect && this.cnt % 2 == 0)) {
			var img01 = new Image();
			img01.src = "takeshi.png";
			context.drawImage(img01, this.x - this.width / 2, this.y - this.height / 2,this.width, this.height);
		}
	
			//	発射された弾を更新・描画
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(this.bullet[i].exist) {
				this.bullet[i].move();
				this.bullet[i].draw(context);
			}
		}
		
				//	カウンタが100になったらリセットし、ダメージエフェクトを解除
		if(this.cnt > 100) {
			this.cnt = 0;
			this.deffect = false;
		}
		
		this.cnt++; // カウンタを更新
	}
}

let WIDTH = 800; // 画面の幅
let HEIGHT = 600; // 画面の高さ

var key = Array(5);
let KEY_RIGHT	= 0;
let KEY_LEFT	= 1;
let KEY_UP		= 2;
let KEY_DOWN	= 3;
let KEY_Z		= 4;
key[KEY_RIGHT]	= 0;
key[KEY_LEFT]	= 0;
key[KEY_UP]		= 0;
key[KEY_DOWN]	= 0;
key[KEY_Z]		= 0;

var player = new Player(); // Playerクラスのインスタンス
let ENEMY_NUM = 8; // 敵の数
var enemy = Array(ENEMY_NUM); // Enemyクラスのインスタンス（配列）
var kind = [1, 2, 3, 0, 2, 0, 3, 1]; // 敵の種類を設定
 
//	Enemyの初期化
for(var i = 0;i < ENEMY_NUM;i++) {
	enemy[i] = new Enemy(WIDTH * (i + 1) / 9, HEIGHT / 4, Math.PI * 5 / 6 - Math.PI * 2 / 3 * i / 7, kind[i]);
}

var canvas; // Canvas
var context; // Context

var score = 0; // スコア
var gameover = false; // ゲームオーバーフラグ
var cnt = 0;

canvas = document.getElementById("canvas"); // Canvasを取得
context = canvas.getContext("2d"); // CanvasからContextを取得

requestAnimationFrame(main); // main関数を実行

function main() {
	context.clearRect(0, 0, WIDTH, HEIGHT); // 画面消去
	
	if(!gameover) { // ゲームオーバーでなければ実行する
		player.shot(key); // プレイヤーのショット
		player.move(key); // プレイヤーを操作
		player.draw(context); // プレイヤーを描画
	}
	
	for(var i = 0;i < ENEMY_NUM;i++) {
		enemy[i].shot(); // 敵のショット
		enemy[i].move(); // 敵を移動
		enemy[i].draw(context); // 敵を描画
	}
	
	if(!gameover) {
		//	敵とプレイヤーの当たり判定
		for(var i = 0;i < ENEMY_NUM;i++) {
			if(!player.deffect && Math.abs(player.x - enemy[i].x) < (player.width + enemy[i].width) / 2 &&
				Math.abs(player.y - enemy[i].y) < (player.height + enemy[i].height) / 2) {
				player.cnt = 0; // プレイヤーのカウンタをリセット
				player.residue--; // プレイヤーの残基を減らす
				player.deffect = true; // ダメージエフェクトを開始する
			}
		}
		
		//	プレイヤーと敵の弾の当たり判定
		for(var i = 0;i < ENEMY_NUM;i++) {
			for(var j = 0;j < enemy[i].BULLET_NUM;j++) {
				if(enemy[i].bullet[j].exist) {
					if(!player.deffect && Math.abs(player.x - enemy[i].bullet[j].x) < (player.width + enemy[i].bullet[j].width) / 2 &&
						Math.abs(player.y - enemy[i].bullet[j].y) < (player.height + enemy[i].bullet[j].height) / 2) {
						player.cnt = 0; // プレイヤーのカウンタをリセット
						player.residue--; // プレイヤーの残基を減らす
						player.deffect = true; // ダメージエフェクトを開始する
					}
				}
			}
		}
		
		//	プレイヤーの弾と敵の当たり判定
		for(var i = 0;i < player.BULLET_NUM;i++) {
			if(player.bullet[i].exist) {
				for(var j = 0;j < ENEMY_NUM;j++) {
					if(Math.abs(player.bullet[i].x - enemy[j].x) < (player.bullet[i].width + enemy[j].width) / 2 &&
						Math.abs(player.bullet[i].y - enemy[j].y) < (player.bullet[i].height + enemy[j].height) / 2) {
						enemy[j].x = WIDTH / 12 + Math.random() * WIDTH * 5 / 6; // ランダムなX座標に設定
						enemy[j].y = HEIGHT / 8; // Y座標を設定
						enemy[j].angle = Math.PI * 2 * Math.random(); // ランダムな角度に設定
						player.bullet[i].exist = false; // プレイヤーの弾を消す
						switch(enemy[j].kind) {
							case 0: score += 100; break; // スコアを100アップ
							case 1: score += 200; break; // スコアを200アップ
							case 2: score += 300; break; // スコアを300アップ
						}
					}
				}
			}
		}
	}
	
	if(player.residue == 0) { // 残基が0になったら
		gameover = true; // ゲームオーバーにする
		
		//	プレイヤーの弾をすべて消す
		for(var i = 0;i < player.BULLET_NUM;i++) {
			player.bullet[i].exist = false;
		}
	}
		//	残基の表示
	for(var i = 0;i < player.residue;i++) {
		context.fillStyle = "rgb(255, 0, 0)";
		context.fillRect(10 + i * 40, 60, player.width, player.height);
	}
	
		//	スコアの表示
	context.font = "bold 20px sans-serif";
	context.fillStyle = "rgb(255, 255, 255)";
	context.fillText("SCORE: " + score, 10, 40);
	
		//	ゲームオーバー後の内容
	if(gameover) {
		//	GAME OVERと表示する
		context.font = "bold 60px sans-serif";
		context.fillStyle = "rgb(255, 100, 100)";
		context.fillText("GAME OVER...", WIDTH / 6, HEIGHT / 2);
		
		//	Press Enter to Continueと表示する
		context.font = "bold 40px sans-serif";
		context.fillStyle = "rgba(255, 255, 255, " + (Math.sin(Math.PI * 2 * cnt / 200)) + ")";
		context.fillText("Press Enter to Continue", WIDTH / 6, HEIGHT * 2 / 3);
		
		//	カウンタを更新
		cnt++;
		//	カウンタを200でリセットする
		if(cnt == 200) cnt = 0;	
	}
	
	requestAnimationFrame(main); // ループ
}

document.addEventListener("keydown", e => {
	var keyCode = e.keyCode; // キーコードを取得
	
	switch(keyCode) {
		case 39: key[KEY_RIGHT]	= 1; break;
		case 37: key[KEY_LEFT]	= 1; break;
		case 38: key[KEY_UP]	= 1; break;
		case 40: key[KEY_DOWN]	= 1; break;
				case 90: key[KEY_Z]++;		 break;
		case 13:
			//	ゲームオーバー後にEnterが押されたら
			if(gameover) {
				gameover = false; // ゲームオーバーを解除
				player.residue = 3; // 残基をリセット
				player.deffect = false; // ダメージエフェクトを解除
				player.x = WIDTH / 2; // X座標をリセット
				player.y = HEIGHT * 3 / 4; // Y座標をリセット
				score = 0; // スコアをリセット
				
				//	敵を初期化
				for(var i = 0;i < ENEMY_NUM;i++) {
					enemy[i] = new Enemy(WIDTH * (i + 1) / 9, HEIGHT / 4, Math.PI * 5 / 6 - Math.PI * 2 / 3 * i / 7, kind[i]);
				}
			}
			break;
	}
});

document.addEventListener("keyup", e => {
	var keyCode = e.keyCode; // キーコードを取得
	
	switch(keyCode) {
		case 39: key[KEY_RIGHT]	= 0; break;
		case 37: key[KEY_LEFT]	= 0; break;
		case 38: key[KEY_UP]	= 0; break;
		case 40: key[KEY_DOWN]	= 0; break;
		case 90: key[KEY_Z]		= 0; break;
	}
});