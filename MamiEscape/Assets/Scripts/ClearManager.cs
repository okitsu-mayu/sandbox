using UnityEngine;
using System.Collections;

using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class ClearManager : MonoBehaviour
{

    public GameObject buttonMessage;    //ボタン：メッセージ
    public GameObject buttonMessageText; //メッセージテキスト

	private int count; //会話カウント
	private string[] arrayMessage = new string[6]{"「真美、よく頑張ったね」　▼","「真美の誕生日会の準備をするために、真美には地球の裏側へ行って貰ってたんだ」　▼","「豪華な食事を沢山用意したから、俺と一緒にセクシーなパーティーをしよう！」　▼","ケンティー……高級食材を食べると運気が下がっちゃうのに、私のために……！　▼","今年の誕生日は、ちょっと刺激的で素敵な思い出になりそう……★　▼","～Sexy　End～"};
    // Start is called before the first frame update
    void Start()
    {
        count = 0;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    
    //メッセージタップ
    public void PushButtonMessage()
    {
    	if(count < 6){
        	buttonMessageText.GetComponent<Text>().text = arrayMessage[count];
        	count++;
        }
        else
        {
    		SceneManager.LoadScene("EndScene");
        }
    }
}
