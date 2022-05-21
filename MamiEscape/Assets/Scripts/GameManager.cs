using UnityEngine;
using System.Collections;

using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{

    //壁
    public const int WALL_FRONT = 1;  //前
    public const int WALL_RIGHT = 2;  //右
    public const int WALL_BACK = 3; //後
    public const int WALL_LEFT = 4; //左

    public GameObject panelWalls;	//壁全体

    public GameObject buttonYakan;       //やかんボタン
    public GameObject imageYakanIcon;	//やかんアイコン

    public GameObject buttonStove;       //ストーブボタン
    public GameObject buttonStove2;       //ストーブボタン2
    
    public GameObject buttonPuipui;       //ぷいぷいボタン
    public GameObject buttonPuipui2;       //ぷいぷいボタン2

    public GameObject buttonNuka;       //ぬか漬けボタン
    public GameObject imageNukaIcon;	//ぬか漬けアイコン

    public GameObject buttonKento;       //ケンティーボタン

    public GameObject buttonMessage;    //ボタン：メッセージ
    public GameObject buttonMessageText; //メッセージテキスト

    public GameObject inputPass;    //パスワード入力

    public Sprite yakanPicture;			//やかんの絵
    public Sprite nukaPicture;			//ぬか漬けの絵

    public InputField inputField;
    public Text text;

    private int wallNo;	//現在方向
    private int yakanStatus;	//やかんの状態(0:未所持1:空2:水入り3:お湯入り）

    private int puiTalkCount;	// ぷいぷい会話数
    private int yuzuTalkCount;	// ゆずる会話数
    private bool nukadukeFlg;	// ぬか漬けフラグ

    // Use this for initialization
    void Start()
    {
        wallNo = WALL_FRONT;
        yakanStatus = 0; //やかんは未所持
        puiTalkCount = 0;
        yuzuTalkCount = 0;
        inputField = inputField.GetComponent<InputField> ();
        text = text.GetComponent<Text> ();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    
    // パスワード入力
    public void InputPass()
    {
    	ClearButtons();
    	if(inputField.text == "Wild")
    	{
    		SceneManager.LoadScene("ClearScene");
    	}
    	else
    	{
            DisplayMessage("違うみたい……");
     	    inputPass.SetActive(false);           
    	}
    }

    // パスワード変更
    public void ChangePass()
    {
		ClearButtons();
    }
    

    //ぷいぷいタップ
    public void PushButton_puipui()
    {
        if (yakanStatus < 2)
        {
            //やかんなし・やかんあり
            DisplayMessage("巨大な氷砂糖の中に妖精さんがいる！\n助けてあげられないかな？");
        }
        else if (yakanStatus == 2)
        {
            //やかん水あり
            DisplayMessage("水じゃ駄目か……お湯なら溶けるかな？");
        }
        else
        {
            //やかんお湯あり
            DisplayMessage("溶けた！");
            buttonPuipui.SetActive(false); //氷砂糖消去
            buttonPuipui2.SetActive(true); //ぷいぷい表示
        }
    }

    //ぷいぷい2タップ
    public void PushButton_puipui2()
    {
    	switch(puiTalkCount) {
    	case 0:
    	    DisplayMessage("「ありがとうございます～～～！」");
    	    puiTalkCount++;
    	    break;
    	case 1:
    	    DisplayMessage("「糠床の妖精ぷいぷいちゃんです。\n氷砂糖が大好物なのです」");
    	    puiTalkCount++;
    	    break;
    	case 2:
    	    DisplayMessage("「ここは地球の裏側だから、人が来るのは珍しいのです。\nだからずっと氷砂糖漬けで困ってたです」");
    	    puiTalkCount++;
    	    break;
    	case 3:
    	    DisplayMessage("「お礼にぬか漬けをプレゼントするです！」");
    	    puiTalkCount++;
    	    nukadukeFlg = true;
            buttonNuka.SetActive(true);
            imageNukaIcon.GetComponent<Image>().sprite = nukaPicture; 
    	    break;
    	 default:
    	    DisplayMessage("「いつか氷砂糖のぬか漬けを作るです～～～！」");
    	    break;
    	}

    }

    //ゆずるタップ
    public void PushButton_yuzuru()
    {
    	if(nukadukeFlg == false)
    	{
    	    DisplayMessage("「お腹が空いてジャンプ出来ない……」");
    	}
    	else
    	{
    	switch(yuzuTalkCount) {
    	case 0:
    	    DisplayMessage("「ぬか漬け……食べてもいいの！？\nありがとう！」");
    	    yuzuTalkCount++;
    	    break;
    	case 1:
    	    DisplayMessage("「ぬか漬けを食べて元気が戻ったよ。\n今ならジャンプも出来そうだ」");
    	    yuzuTalkCount++;
    	    break;
    	 default:
    	    DisplayMessage("「僕が代わりにパスワードを入力しよう」");
    	    break;
    	}
        }
    }

    //パスワードタップ
    public void PushButton_pass()
    {
    	if(yuzuTalkCount < 2)
    	{
    	    DisplayMessage("あそこにパスワードを入れるのかな？\nでも、高くて届かない……");
    	}
    	else
    	{
    	    inputPass.SetActive(true);
        }
    }

    //手紙タップ
    public void PushButton_letter()
    {
    		ClearButtons();
    	    buttonKento.SetActive(true);
    }

    //やかんタップ
    public void PushButtonYakan()
    {
    	ClearButtons();
        buttonYakan.SetActive(false);
    }

    //ぬか漬けタップ
    public void PushButtonNuka()
    {
    	ClearButtons();
        buttonNuka.SetActive(false);
    }


    //ケンティータップ
    public void PushButtonKento()
    {
        buttonKento.SetActive(false);
    }
    
    //表示させるメッセージ 滝
    public void PushButton_taki()
    {
        if(yakanStatus == 1)
        {
            DisplayMessage("やかんに水を入れた");
            yakanStatus = 2;        
        }
        else
        {
            DisplayMessage("滝……！？\nここ、長時間いたら危ないんじゃ……");
        }
    }

    //表示させるメッセージ ストーブ
    public void PushButton_stove()
    {
        if (yakanStatus == 0)
        {
            DisplayMessage("やかん、何かに使えるかな？");
            buttonStove.SetActive(false);
            buttonStove2.SetActive(true);
            buttonYakan.SetActive(true);
            imageYakanIcon.GetComponent<Image>().sprite = yakanPicture; 
            yakanStatus = 1; // やかん所持
        }
    }
    

    //表示させるメッセージ ストーブ2
    public void PushButton_stove2()
    {
        if (yakanStatus == 2)
        {
            DisplayMessage("やかんの水を温めた");
            yakanStatus = 3;
        }
        else
        {
            DisplayMessage("ストーブ温かいなぁ～");
         }
    }

    //メッセージタップ
    public void PushButtonMessage()
    {
        buttonMessage.SetActive(false); //メッセージ消去
    }

    //右プッシュボタン
    public void PushButtonRight()
    {
        wallNo++; 
        if (wallNo > WALL_LEFT)
        {
            wallNo = WALL_FRONT;
        }
        DisplayWall();
        ClearButtons();
    }
    //左プッシュボタン
    public void PushButtonLeft()
    {
        wallNo--;
        if (wallNo < WALL_FRONT)
        {
            wallNo = WALL_LEFT;
        }
        DisplayWall();
        ClearButtons();
    }

    //表示クリア
    void ClearButtons()
    {
        buttonMessage.SetActive(false);
    }

    //メッセージ表示
    void DisplayMessage(string mes)
    {
        buttonMessage.SetActive(true);
        buttonMessageText.GetComponent<Text>().text = mes;
    }
    //壁表示
    void DisplayWall()
    {
        switch (wallNo)
        {
            case WALL_FRONT: //前
                panelWalls.transform.localPosition = new Vector3(0.0f, 0.0f, 0.0f);
                break;
            case WALL_RIGHT: //右
                panelWalls.transform.localPosition = new Vector3(-1000.0f, 0.0f, 0.0f);
                break;
            case WALL_BACK: //後
                panelWalls.transform.localPosition = new Vector3(-2000.0f, 0.0f, 0.0f);
                break;
            case WALL_LEFT: //左
                panelWalls.transform.localPosition = new Vector3(-3000.0f, 0.0f, 0.0f);
                break;
        }
    }
}