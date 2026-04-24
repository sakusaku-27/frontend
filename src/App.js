import React, { useState } from "react";
import "./App.css";

function App() {

  const [playerName, setPlayerName] = useState("");
  const [started, setStarted] = useState(false);
  const [route, setRoute] = useState(null);

  const [currentId, setCurrentId] = useState(null);
  const [affection, setAffection] = useState(0);
  const [depend, setDepend] = useState(0);
  const [alert, setAlert] = useState(0);
  const [finished, setFinished] = useState(false);

  // =========================
  // イベント
  // =========================
  const events = {

    100: {
      character: "■ プロローグ：「雨の日の偶然」",
      text: `雨が降り出したのは、帰り道の途中だった。\n\n傘はない。\n走れば間に合う距離——でも足が止まる。`,
      next: 101
    },

    101: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1-2.png",
      text: "……濡れてるよ",
      next: 1011
    },

    1011: {
      character: "ナレーション",
      text: `静かな声に振り返ると、少し離れた場所に立つ男性がいた。\n\n傘を、こちらに少しだけ傾けている。`,
      next: 102
    },

    102: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1-2.png",
      text: "これ、使って",
      next: 1012
    },

    1012: {
      character: "あなた",
      text: `でも、それあなたの…`,
      next: 1013
    },

    1013: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1-2.png",
      text: "いいよ、近いから",
      next: 1014
    },

    1014: {
      character: "ナレーション",
      text: `無理に差し出すでもなく、ただそこにあるだけの優しさ。
      \n\nその優しさに心がじんわりとあたたかい気持ちになる。`,
      next: 1015
    },

    1015: {
      character: "如月ハル",
      text: `(傘を差しだす)`,
      image: process.env.PUBLIC_URL + "/char1-2.png",
      choices: [
        { label: "ありがとう", next: 110, affection: 5, depend: 3 },
        { label: "断る", next: 111, alert: 3 },
        { label: "一緒に行く", next: 112, affection: 3 }
      ]
    },

    110: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1-2.png",
      text: "風邪ひくと大変だからね。",
      next: 1200
    },

    1200: {
      character: "ナレーション",
      text: "その言葉に、少しだけ力が抜けた。",
      next: 120
    },

    111: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1-2.png",
      text: "無理しないで。\n\n(無理やり傘を渡される)",
      next: 120
    },

    112: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1-2.png",
      text: "……じゃあ、行こう",
      next: 120
    },

    120: {
      character: "■ シーン2：「もう一度、会う理由」",
      text: `翌日。\n\n手元に残った傘を見て、ふと迷う。返したい。\nでも、連絡先は知らない。\n\n\n\n——同じ時間、同じ場所なら。`,
      next: 1210
    },

    1210: {
      character: "ナレーション",
      text: `駅前に立つと、昨日と同じ場所にその人はいた。\nまるで最初からそこにいるのが自然みたいに。`,
      next: 121
    },

    121: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "来ると思ってた",
      next: 1211
    },

    1211: {
      character: "あなた",
      text: `まってたの？`,
      next: 1212
    },

    1212: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: `うん。時間、ちょうどだったから`,
      next: 1213
    },

    1213: {
      character: "ナレーション",
      text: `少しだけ、不思議な感覚。\nでも、嫌ではない。`,
      next: 1214
    },

    1214: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "昨日の帰り道、あのあと大丈夫だった？",
      next: 1215
    },

    1215: {
      character: "あなた",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "一瞬、言葉に詰まる。\n\n見ていたわけじゃないのに、\nまるで知っているみたいな聞き方。",
      choices: [
        { label: "ありがとう", next: 130, affection: 5 },
        { label: "なんで分かったの？", next: 131, alert: 2 },
        { label: "警戒する", next: 132, alert: 5 }
      ]
    },

    131: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "なんとなく、かな",
      next: 130
    },

    132: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "ごめん、怖かった？",
      next: 130
    },

    130: {
      character: "■ シーン3：「隣にいる距離」",
      text: `傘を返して、これで終わり——のはずだった。。`,
      next: 1400
    },

    1400: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "少し歩かない？",
      next: 1401
    },

    1401: {
      character: "ナレーション",
      text: `断る理由は、特にない。\n並んで歩く。\n雨上がりの道は静かで、少しだけ空気が柔らかい。`,
      next: 140
    },

    140: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "今日は仕事？それとも学校？",
      next: 1402
    },

    1402: {
      character: "ナレーション",
      text: `答えると、`,
      next: 1403
    },

    1403: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "ちゃんとしてるんだね",
      next: 1404
    },

    1404: {
      character: "ナレーション",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: `褒められているわけじゃないのに、否定もされていない。\nただ、そのままを受け入れられたような感覚。`,
      choices: [
        { label: "あなたは何してる人？", next: 1405, affection: 5, depend: 5 },
        { label: "そろそろ帰るね", next: 1407, depend: 3 },
        { label: "このまま一緒に歩く", next: 1407, alert: 5 }
      ]
    },

    1405: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "普通の人だよ",
      next: 1406
    },

    1406: {
      character: "ナレーション",
      text: "\nそう答える声は、どこか曖昧で。\n\n\n\nでも、それ以上踏み込む空気でもなかった。",
      next: 1407
    },

    1407: {
      character: "■ シーン4：「名前」",
      text: "別れ際。\n少しの沈黙のあと——",
      next: 1408
    },

    1408: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "名前、まだだったね",
      choices: [{ label: "名前を伝える", next: 1409}]
    },

    1409: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: `${playerName}\n…うん、覚えやすい。\n\n(少しの間)\n\nいい名前だね`,
      next: 1410
    },

    1410: {
      character: "ナレーション",
      text: "なぜか、その言葉が少しだけ残る。",
      next: 1411
    },

    1411: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "じゃあ、また",
      next: 1412
    },

    1412: {
      character: "あなた",
      text: "また？",
      next: 1413
    },

    1413: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "うん、なんとなく",
      next: 1414
    },

    1414: {
      character: "ナレーション",
      text: "その“なんとなく”は、曖昧なのに、妙に確信めいていた。",
      next: 1415
    },

    1415: {
      character: "■ シーン5：「2回目の偶然」",
      text: "数日後。\n同じ時間、同じ帰り道。",
      next: 1416
    },

    1416: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "…また会ったね",
      next: 1417
    },

    1417: {
      character: "ナレーション",
      text: "振り向くと、ハルがいる。",
      next: 1418
    },

    1418: {
      character: "あなた",
      text: "偶然？",
      next: 1419
    },

    1419: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "たぶん",
      next: 1420
    },

    1420: {
      character: "ナレーション",
      text: "少しだけ笑って、\n自然に隣に並ぶ。",
      next: 1421
    },

    1421: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "今日、少し疲れてる？",
      next: 1422
    },

    1422: {
      character: "ナレーション",
      text: "また、同じ感覚。\n言われるまで気づかなかったことを、先に触れられる。",
      choices: [
        { label: "そうかも", next: 1423, affection: 5, depend: 5 },
        { label: "大丈夫", next: 1423, depend: 3 },
        { label: "なんでわかったの？", next: 1423, alert: 5 }
      ]
    },

    1423: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "顔見ればわかるよ",
      next: 1424
    },

    1424: {
      character: "ナレーション",
      text: "それは特別なことじゃないはずなのに、\nなぜか少しだけ安心する。",
      next: 1425
    },

    1425: {
      character: "■ シーン6：「少しずつ増える時間」",
      text: `それから——\n会う回数が増えた。\n\n気づけば、彼が隣にいるのが当たり前になっていた。`,
      next: 1426
    },

    1426: {
      character: "ナレーション",
      text: `ハルは変わらない。\n無理に距離を詰めない\n否定しない\nただ、そこにいる\n\n\nある日`,
      next: 150
    },

    150: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "今日、少し時間ある？",
      choices: [
        { label: "ある", next: 200, affection: 5, depend: 5 },
        { label: "少しだけ", next: 200, depend: 3 },
        { label: "帰る", next: 1427, alert: 5 }
      ]
    },

    1427: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "少しだけでいいんだ、お願い。",
      choices: [
        { label: "少しだけだよ", next: 200, affection: 5, depend: 5 },
        { label: "帰る", next: 160, alert: 5 }
      ]
    },

    160: {
      character: "ナレーション",
      text: "距離を保った。",
      next: 920
    },

    200: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "君と話してると安心する",
      next: 220
    },

    220: {
      character: "如月ハル",
      image: process.env.PUBLIC_URL + "/char1.png",
      text: "ずっと一緒にいたい。\n\nよければ、これからもずっと隣にいてもいい？",
      choices: [
        { label: "いいよ", next: 900 },
        { label: "少し考える", next: 910 },
        { label: "いまはまだ…", next: 920 }
      ]
    },

    // エンディング
    900: {
      character: "？？？",
      image: process.env.PUBLIC_URL + "/char1-3.png",
      text: "もう離れられないよ",
      end: "依存エンド"
    },

    910: {
      character: "？？？",
      image: process.env.PUBLIC_URL + "/char1-3.png",
      text: "なんで気づいたの？",
      end: "回避エンド"
    },

    920: {
      character: "？？？",
      image: process.env.PUBLIC_URL + "/char1-3.png",
      text: "あーあ、逃げちゃった",
      end: "安全エンド"
    }

  };

  const currentEvent = events[currentId];

  // =========================
  // 進行
  // =========================
  const next = () => {

    if (currentEvent.end) {
      setFinished(true);
      return;
    }

    if (currentEvent.next) {
      setCurrentId(currentEvent.next);
    } else {
      setFinished(true);
    }
  };

  const choose = (c) => {
    if (c.affection) setAffection(a => a + c.affection);
    if (c.depend) setDepend(d => d + c.depend);
    if (c.alert) setAlert(a => a + c.alert);

    setCurrentId(c.next);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="container">
      <div className="card">

        {/* 名前入力 */}
        {!started && (
          <div className="name-screen">
            <h2>あなたの名前</h2>
            <input
              className="name-input big"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button disabled={!playerName} onClick={() => setStarted(true)}>
              START
            </button>
          </div>
        )}

        {/* キャラ選択 */}
{started && !route && (
  <div className="select-container">
    <h2>誰と出会う？</h2>

    <div className="select-grid">

      {/* ハル */}
      <div className="select-card">
        <img src={process.env.PUBLIC_URL + "/char1.png"} />

        <h3>如月ハル</h3>

        <p className="desc">
          穏やかで優しい青年。<br/>
          気づけば、隣にいるのが当たり前になる存在。
        </p>

        <button onClick={() => { setRoute("haru"); setCurrentId(100); }}>
          この人と出会う
        </button>
      </div>

      {/* ジン */}
      <div className="select-card">
        <img src={process.env.PUBLIC_URL + "/char2.png"} alt="jin" />

        <h3>神崎ジン</h3>

        <p className="desc">
          冷静で論理的な思考を持つ男。<br/>
          決断に迷ったとき、彼の存在はとても心強い。
        </p>

        <button>
          この人と出会う（未実装）
        </button>
      </div>

      {/* ソウ */}
      <div className="select-card">
        <img src={process.env.PUBLIC_URL + "/char3.png"} alt="sou" />

        <h3>一ノ瀬ソウ</h3>

        <p className="desc">
          どこか不安定な雰囲気を持つ男。<br/>
          守ってあげたくなるような危うさが魅力でもある。
        </p>

        <button>
          この人と出会う（未実装）
        </button>
      </div>

    </div>
  </div>
)}

        {/* 本編 */}
        {route && currentEvent && !finished && (
          <div className="game">

            <div className="left">
              {currentEvent.image && (
                <img src={currentEvent.image} alt="char" />
              )}
            </div>

            <div className="right">

              <div className="text-area">
                <h2>{currentEvent.character}</h2>

                <p className="dialog">
                  {currentEvent.text.split("\n").map((line, i) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </p>
              </div>

              <div className="ui-area">

                {currentEvent.choices ? (
                  <div className="buttons">
                    {currentEvent.choices.map((c, i) => (
                      <button key={i} onClick={() => choose(c)}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button className="next-btn" onClick={next}>
                    ▶ 次へ
                  </button>
                )}

                <div className="status">
                  <span>❤️ {affection}</span>
                  <span>💀 {depend}</span>
                  <span>⚠️ {alert}</span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ✅ エンディング（ここが重要） */}
        {finished && currentEvent && (
          <div className="ending">
            <h2>{currentEvent.end}</h2>

            <p>好感度: {affection}</p>
            <p>依存: {depend}</p>
            <p>警戒: {alert}</p>

            <button onClick={() => window.location.reload()}>
              もう一度プレイ
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
