/* ============================================
   旅行プランナー - app.js
   テンプレートベースの旅行プラン生成（API不要）
   ============================================ */

// --- State ---
const state = {
  currentStep: 1,
  destination: '',
  days: 0,
  budget: 'medium',
  companion: '',
  genres: [],
  pace: 'normal',
  preference: '',
};

// --- Destinations Data ---
const DESTINATIONS = {
  tokyo: {
    name: '東京',
    nameEn: 'Tokyo',
    emoji: '🗼',
    spots: [
      { name: '浅草寺・仲見世通り', genre: 'culture', description: '東京最古の寺院と活気あふれる商店街を散策', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '渋谷スクランブル交差点', genre: 'city', description: '世界一有名な交差点を体験！SKYから眺めるのもおすすめ', time: '1時間', costLevel: 1, bestTime: 'evening' },
      { name: '明治神宮', genre: 'culture', description: '都心の森に囲まれた神聖な空間でリフレッシュ', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '東京スカイツリー', genre: 'sightseeing', description: '地上450mからの絶景パノラマを楽しもう', time: '2時間', costLevel: 3, bestTime: 'afternoon' },
      { name: '築地場外市場', genre: 'food', description: '新鮮な海鮮グルメの食べ歩き天国', time: '2時間', costLevel: 2, bestTime: 'morning' },
      { name: '原宿・竹下通り', genre: 'shopping', description: 'カワイイ文化の発信地でトレンドチェック', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
      { name: 'チームラボプラネッツ', genre: 'art', description: '身体ごとアートに没入する体験型ミュージアム', time: '2時間', costLevel: 3, bestTime: 'afternoon' },
      { name: '新宿御苑', genre: 'nature', description: '都会のオアシスで四季折々の自然を満喫', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '秋葉原', genre: 'shopping', description: 'アニメ・ゲーム・電子機器の聖地を探索', time: '2.5時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '六本木ヒルズ展望台', genre: 'sightseeing', description: '東京タワーと都心の夜景を一望できるスポット', time: '1.5時間', costLevel: 2, bestTime: 'evening' },
      { name: '上野公園・美術館巡り', genre: 'art', description: '国立西洋美術館や東京国立博物館が集まるアートエリア', time: '3時間', costLevel: 2, bestTime: 'morning' },
      { name: 'お台場', genre: 'sightseeing', description: 'レインボーブリッジの景色とエンタメ施設が充実', time: '3時間', costLevel: 2, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: '江戸前寿司', description: '新鮮なネタを職人が握る本場の味' },
      { name: 'もんじゃ焼き', description: '月島で食べる東京のソウルフード' },
      { name: 'ラーメン（つけ麺）', description: '激戦区で味わう濃厚な一杯' },
      { name: '天ぷら', description: 'サクッと揚げたての江戸前天ぷら' },
      { name: '深川めし', description: 'あさりの炊き込みご飯、下町の味' },
    ],
    tips: [
      'Suica/PASMOを最初に買うと移動がめちゃくちゃ楽になるよ',
      '朝の築地は7-9時がベストタイム。早起きする価値あり！',
      '山手線を使いこなせば主要スポットはほぼ回れる',
      '金曜・土曜の夜は渋谷・新宿が特に賑やか',
    ],
  },
  osaka: {
    name: '大阪',
    nameEn: 'Osaka',
    emoji: '🏯',
    spots: [
      { name: '道頓堀', genre: 'food', description: 'グリコ看板と食い倒れの街を満喫', time: '2時間', costLevel: 2, bestTime: 'evening' },
      { name: '大阪城公園', genre: 'culture', description: '天下統一の象徴、壮大な城と広大な公園', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '通天閣・新世界', genre: 'sightseeing', description: 'レトロな雰囲気と串カツの聖地', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'ユニバーサル・スタジオ・ジャパン', genre: 'activity', description: '世界レベルのテーマパークで1日遊び尽くそう', time: '8時間', costLevel: 3, bestTime: 'morning' },
      { name: '黒門市場', genre: 'food', description: '大阪の台所で新鮮な海鮮やフルーツを食べ歩き', time: '1.5時間', costLevel: 2, bestTime: 'morning' },
      { name: '中之島エリア', genre: 'art', description: '美術館や歴史的建築が並ぶ水辺の文化ゾーン', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'あべのハルカス', genre: 'sightseeing', description: '日本一高いビルから大阪の街を一望', time: '1.5時間', costLevel: 2, bestTime: 'evening' },
      { name: '天王寺動物園', genre: 'nature', description: '都会のど真ん中にある歴史ある動物園', time: '2.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '心斎橋筋商店街', genre: 'shopping', description: '全長600mのアーケードでショッピング三昧', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '海遊館', genre: 'nature', description: '世界最大級の水族館でジンベエザメに会える', time: '2.5時間', costLevel: 2, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'たこ焼き', description: '外はカリッ、中はトロトロの大阪名物' },
      { name: 'お好み焼き', description: '鉄板で焼くフワフワの大阪スタイル' },
      { name: '串カツ', description: '新世界の名物！二度漬け禁止のルールを守ってね' },
      { name: '551の豚まん', description: '大阪土産の大定番。できたてが最高' },
      { name: 'きつねうどん', description: '甘く炊いたお揚げが乗った大阪うどん' },
    ],
    tips: [
      '大阪メトロの1日乗車券「エンジョイエコカード」が超お得',
      '道頓堀は夜のネオンが映えるから夕方以降がおすすめ',
      'USJに行くなら開園1時間前に並ぶのが鉄則',
      '「まいど」「おおきに」を使うと地元の人と仲良くなれるかも',
      'たこ焼きは「わなか」「くくる」「たこ八」で食べ比べしてみて',
    ],
  },
  kyoto: {
    name: '京都',
    nameEn: 'Kyoto',
    emoji: '⛩️',
    spots: [
      { name: '伏見稲荷大社', genre: 'culture', description: '千本鳥居のトンネルは圧巻の美しさ', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '金閣寺', genre: 'culture', description: '金色に輝く世界遺産、池に映る姿も必見', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '嵐山・竹林の道', genre: 'nature', description: '竹林に包まれた幻想的な散歩道', time: '2.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '清水寺', genre: 'culture', description: '清水の舞台からの眺望は京都随一', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '錦市場', genre: 'food', description: '京の台所で漬物や湯葉の食べ歩き', time: '1.5時間', costLevel: 2, bestTime: 'morning' },
      { name: '祇園・花見小路', genre: 'culture', description: '石畳の路地で舞妓さんに出会えるかも', time: '1.5時間', costLevel: 1, bestTime: 'evening' },
      { name: '銀閣寺・哲学の道', genre: 'nature', description: '静寂の寺院から桜並木の小径を散策', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '二条城', genre: 'culture', description: '徳川家の威光を感じる世界遺産の城', time: '1.5時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '京都国立博物館', genre: 'art', description: '国宝級の美術品が集まる文化の殿堂', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '東福寺', genre: 'culture', description: '秋の紅葉は息を呑む美しさ', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
    ],
    localFood: [
      { name: '湯豆腐', description: '嵐山や南禅寺で味わう上品な一品' },
      { name: '抹茶スイーツ', description: '宇治抹茶を使ったパフェやわらび餅' },
      { name: '京懐石', description: '四季を感じる繊細な和食のコース' },
      { name: 'にしんそば', description: '甘く炊いたにしんが乗った京都の定番麺' },
      { name: '八つ橋', description: '生八つ橋は京都土産の王道' },
    ],
    tips: [
      '朝イチ（7-8時）の伏見稲荷は人が少なくて写真も撮り放題',
      'バスは混むから地下鉄やJRも組み合わせて使うのがコツ',
      '寺社は拝観時間が16-17時で終わるところが多いから注意',
      '春（桜）と秋（紅葉）は激混みだけど、それだけの価値はある',
    ],
  },
  hokkaido: {
    name: '北海道',
    nameEn: 'Hokkaido',
    emoji: '🦌',
    spots: [
      { name: '小樽運河', genre: 'sightseeing', description: 'レトロな倉庫群が並ぶロマンチックな運河', time: '2時間', costLevel: 1, bestTime: 'evening' },
      { name: '札幌・大通公園', genre: 'city', description: '札幌の中心を貫く緑豊かな公園', time: '1時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '二条市場', genre: 'food', description: '新鮮な海鮮丼やカニを堪能できる市場', time: '1.5時間', costLevel: 2, bestTime: 'morning' },
      { name: '富良野ラベンダー畑', genre: 'nature', description: '一面に広がる紫色の絨毯は夏の絶景', time: '2.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '旭山動物園', genre: 'nature', description: '行動展示で動物の生き生きした姿が見られる', time: '3時間', costLevel: 2, bestTime: 'morning' },
      { name: '函館山夜景', genre: 'sightseeing', description: '100万ドルの夜景と称される日本三大夜景', time: '2時間', costLevel: 2, bestTime: 'evening' },
      { name: '白い恋人パーク', genre: 'activity', description: 'お菓子の世界を楽しめるテーマパーク', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
      { name: 'ニセコ', genre: 'activity', description: '夏はラフティング、冬はパウダースノーのスキー', time: '4時間', costLevel: 3, bestTime: 'morning' },
      { name: '登別温泉・地獄谷', genre: 'nature', description: '湯煙が立ち上る迫力の火山活動を間近で体験', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '札幌ビール博物館', genre: 'food', description: '日本のビールの歴史を学んで試飲も楽しめる', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'ジンギスカン', description: 'ラム肉を特製タレで食べる北海道の名物料理' },
      { name: '海鮮丼', description: 'ウニ・イクラ・カニが盛り放題の贅沢丼' },
      { name: '味噌ラーメン', description: '濃厚味噌スープにバターコーンが最高の組み合わせ' },
      { name: 'スープカレー', description: 'スパイシーなスープに大きな具材がゴロゴロ' },
      { name: 'ザンギ', description: '北海道流の鶏の唐揚げ。ジューシーで濃い味付け' },
      { name: '六花亭マルセイバターサンド', description: '北海道土産の大定番スイーツ' },
    ],
    tips: [
      '北海道は広い！移動時間を多めに見積もっておこう',
      'レンタカーがあると圧倒的に便利。電車だけだと限界がある',
      '夏でも朝晩は冷えるから薄手の上着を忘れずに',
      '冬はマイナス10度以下になることも。防寒対策は万全に',
      '6-8月のベストシーズンは宿が埋まりやすいから早めに予約',
    ],
  },
  okinawa: {
    name: '沖縄',
    nameEn: 'Okinawa',
    emoji: '🏖️',
    spots: [
      { name: '美ら海水族館', genre: 'nature', description: '巨大水槽を泳ぐジンベエザメは圧巻の迫力', time: '3時間', costLevel: 2, bestTime: 'morning' },
      { name: '首里城', genre: 'culture', description: '琉球王国の歴史を感じる世界遺産', time: '2時間', costLevel: 2, bestTime: 'morning' },
      { name: '古宇利島', genre: 'nature', description: 'エメラルドグリーンの海に架かる絶景ブリッジ', time: '2.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '国際通り', genre: 'shopping', description: '沖縄最大の繁華街でお土産探しと食べ歩き', time: '2時間', costLevel: 2, bestTime: 'evening' },
      { name: '青の洞窟シュノーケリング', genre: 'activity', description: '神秘的な青い光に包まれる海中体験', time: '2.5時間', costLevel: 3, bestTime: 'morning' },
      { name: '万座毛', genre: 'sightseeing', description: '象の鼻に見える断崖と真っ青な海の絶景', time: '1時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'アメリカンビレッジ', genre: 'shopping', description: 'アメリカンな雰囲気のショッピング&グルメエリア', time: '2時間', costLevel: 2, bestTime: 'evening' },
      { name: '座喜味城跡', genre: 'culture', description: '美しいカーブを描く城壁と海の眺望', time: '1時間', costLevel: 1, bestTime: 'morning' },
      { name: 'ナガンヌ島', genre: 'activity', description: '無人島で透明度抜群の海を独り占め', time: '4時間', costLevel: 3, bestTime: 'morning' },
      { name: 'やちむん通り', genre: 'art', description: '沖縄の伝統陶器を手に取れる窯元の通り', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'ソーキそば', description: '豚のスペアリブが乗った沖縄のソウルフード' },
      { name: 'タコライス', description: 'タコスの具をご飯に乗せた沖縄生まれのB級グルメ' },
      { name: 'ゴーヤチャンプルー', description: 'ゴーヤと豆腐とポークの定番炒め物' },
      { name: 'サーターアンダギー', description: '沖縄風ドーナツ。外カリ中フワで最高' },
      { name: '海ぶどう', description: 'プチプチ食感がクセになる海の幸' },
    ],
    tips: [
      'レンタカーはほぼ必須！那覇以外は車がないと不便だよ',
      '日焼け止めは最強レベルのものを用意しておこう',
      '台風シーズン（8-9月）は天気予報をこまめにチェック',
      '地元の居酒屋で泡盛を飲みながら三線ライブを楽しんで',
    ],
  },
  fukuoka: {
    name: '福岡',
    nameEn: 'Fukuoka',
    emoji: '🍜',
    spots: [
      { name: '中洲屋台街', genre: 'food', description: '川沿いに並ぶ屋台で博多ラーメンや餃子を堪能', time: '2時間', costLevel: 2, bestTime: 'evening' },
      { name: '太宰府天満宮', genre: 'culture', description: '学問の神様を祀る由緒ある神社', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '博多駅・キャナルシティ', genre: 'shopping', description: '巨大商業施設で買い物と噴水ショーを楽しむ', time: '2.5時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '福岡タワー', genre: 'sightseeing', description: '海浜タワーとしては日本一の高さからの眺望', time: '1.5時間', costLevel: 2, bestTime: 'evening' },
      { name: '柳川・川下り', genre: 'activity', description: 'どんこ舟でゆったり水郷の街を巡る', time: '2時間', costLevel: 2, bestTime: 'morning' },
      { name: '能古島', genre: 'nature', description: 'フェリーで10分の島リゾート。花畑が美しい', time: '3時間', costLevel: 1, bestTime: 'morning' },
      { name: '櫛田神社', genre: 'culture', description: '博多祇園山笠で有名な博多の総鎮守', time: '1時間', costLevel: 1, bestTime: 'morning' },
      { name: '海の中道海浜公園', genre: 'nature', description: '花と海に囲まれた広大な国営公園', time: '3時間', costLevel: 1, bestTime: 'morning' },
    ],
    localFood: [
      { name: '博多ラーメン', description: '濃厚豚骨スープに極細麺。替え玉は必須' },
      { name: 'もつ鍋', description: 'プリプリのもつとニンニクが効いた絶品鍋' },
      { name: '水炊き', description: '鶏の旨味が溶け込んだ白濁スープの鍋' },
      { name: '明太子', description: 'ピリ辛でご飯が無限に進む博多の宝' },
    ],
    tips: [
      '福岡は空港から市内が近いから移動がめちゃくちゃ楽',
      '屋台は20時以降が雰囲気出てくるよ',
      '天神と博多駅は地下鉄で5分。この2エリアを拠点にすると便利',
    ],
  },
  seoul: {
    name: 'ソウル',
    nameEn: 'Seoul',
    emoji: '🇰🇷',
    spots: [
      { name: '景福宮（キョンボックン）', genre: 'culture', description: '韓服を着て朝鮮王朝の宮殿を散策', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '明洞（ミョンドン）', genre: 'shopping', description: 'コスメ・ファッション・屋台グルメの天国', time: '3時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '広蔵市場（クァンジャンシジャン）', genre: 'food', description: '麻薬キンパやビンデトックの食べ歩き聖地', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '北村韓屋村（ブッチョンハノクマウル）', genre: 'culture', description: '伝統的な韓屋が並ぶフォトジェニックな路地', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: 'Nソウルタワー', genre: 'sightseeing', description: '南山の頂上からソウルの街を360度パノラマで', time: '2時間', costLevel: 2, bestTime: 'evening' },
      { name: '弘大（ホンデ）エリア', genre: 'city', description: '若者文化の中心地。カフェ・クラブ・ストリートアート', time: '3時間', costLevel: 2, bestTime: 'evening' },
      { name: '漢江（ハンガン）公園', genre: 'nature', description: 'チキンとビールで川辺ピクニック（チメク）', time: '2時間', costLevel: 1, bestTime: 'evening' },
      { name: '梨泰院（イテウォン）', genre: 'food', description: '多国籍グルメとおしゃれカフェが集まるエリア', time: '2.5時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '東大門デザインプラザ（DDP）', genre: 'art', description: '未来的な建築とデザイン展示を楽しめるランドマーク', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '昌徳宮（チャンドックン）', genre: 'culture', description: 'ユネスコ世界遺産の美しい宮殿と秘苑', time: '2時間', costLevel: 1, bestTime: 'morning' },
    ],
    localFood: [
      { name: 'サムギョプサル', description: '分厚い豚バラ肉を焼いてサンチュで包んで食べる' },
      { name: 'トッポギ', description: '甘辛ソースで炒めたモチモチの韓国餅' },
      { name: 'チキン（フライドチキン）', description: '韓国フライドチキンは種類が多くてどれも絶品' },
      { name: 'ビビンバ', description: '混ぜて食べる韓国の定番ご飯' },
      { name: 'ホットク', description: '黒糖が入ったモチモチの韓国おやつ' },
    ],
    tips: [
      'T-moneyカードを買えば地下鉄・バス・コンビニで使えて超便利',
      'コスメは明洞よりオリーブヤングの方がまとめ買いしやすいかも',
      '地下鉄が充実してるからタクシーはあまり使わなくてOK',
      'カフェ文化がすごいから気になったら入ってみて',
      '韓服レンタルすると景福宮の入場料が無料になるよ',
    ],
  },
  taipei: {
    name: '台北',
    nameEn: 'Taipei',
    emoji: '🇹🇼',
    spots: [
      { name: '九份', genre: 'sightseeing', description: '提灯が灯るノスタルジックな街並みは夕方がベスト', time: '3時間', costLevel: 1, bestTime: 'evening' },
      { name: '台北101', genre: 'sightseeing', description: '超高層ビルの展望台から台北を一望', time: '2時間', costLevel: 3, bestTime: 'afternoon' },
      { name: '士林夜市', genre: 'food', description: '台北最大の夜市で食べ歩きパラダイス', time: '2.5時間', costLevel: 1, bestTime: 'evening' },
      { name: '龍山寺', genre: 'culture', description: '台北最古のお寺でパワーチャージ', time: '1時間', costLevel: 1, bestTime: 'morning' },
      { name: '中正紀念堂', genre: 'culture', description: '衛兵交代式は必見のセレモニー', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '永康街', genre: 'food', description: '小籠包の名店や雑貨屋が並ぶグルメストリート', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '象山', genre: 'nature', description: 'ハイキングで登って台北101をバックに絶景写真', time: '2時間', costLevel: 1, bestTime: 'evening' },
      { name: '故宮博物院', genre: 'art', description: '世界四大博物館の一つ。翠玉白菜は必見', time: '3時間', costLevel: 2, bestTime: 'morning' },
      { name: '迪化街（ディーホアジェ）', genre: 'shopping', description: 'レトロな問屋街でドライフルーツやお茶を購入', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '北投温泉', genre: 'activity', description: '都心から30分で行ける天然温泉エリア', time: '2.5時間', costLevel: 2, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: '小籠包', description: '鼎泰豊（ディンタイフォン）が有名だけど地元店も絶品' },
      { name: 'タピオカミルクティー', description: '本場の味は格別。50嵐や迷客夏がおすすめ' },
      { name: '魯肉飯（ルーローハン）', description: '甘辛い豚そぼろご飯。安くて美味い台湾の国民食' },
      { name: '牛肉麺', description: '濃厚スープに柔らかい牛肉が入った台湾ラーメン' },
      { name: '芒果冰（マンゴーかき氷）', description: '夏季限定の贅沢マンゴーかき氷' },
      { name: '臭豆腐', description: '勇気を出して食べてみて！クセになる味' },
    ],
    tips: [
      '悠遊カード（EasyCard）は地下鉄・バス・コンビニで使えて必須',
      '九份は平日の夕方に行くと比較的空いてるよ',
      '台湾の夜市はだいたい17時以降に賑わい始める',
      'タクシーが安いから4人なら地下鉄より安くなることも',
      '雨が多いから折りたたみ傘は常に持ち歩こう',
    ],
  },
  bangkok: {
    name: 'バンコク',
    nameEn: 'Bangkok',
    emoji: '🇹🇭',
    spots: [
      { name: 'ワット・ポー（涅槃仏寺院）', genre: 'culture', description: '全長46mの黄金の涅槃仏は迫力満点', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: 'ワット・アルン（暁の寺）', genre: 'culture', description: 'チャオプラヤー川沿いにそびえる美しい仏塔', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'カオサン通り', genre: 'city', description: 'バックパッカーの聖地で異文化交流', time: '2時間', costLevel: 1, bestTime: 'evening' },
      { name: 'チャトチャック週末市場', genre: 'shopping', description: '1万5000以上の店が集まるアジア最大級の市場', time: '3時間', costLevel: 1, bestTime: 'morning' },
      { name: '王宮（グランドパレス）', genre: 'culture', description: 'タイで最も神聖な場所。エメラルド仏も必見', time: '2時間', costLevel: 2, bestTime: 'morning' },
      { name: 'アイコンサイアム', genre: 'shopping', description: '最新の巨大モールで買い物と室内水上マーケット', time: '3時間', costLevel: 2, bestTime: 'afternoon' },
      { name: 'ルーフトップバー', genre: 'sightseeing', description: '高層ビルの屋上からバンコクの夜景とカクテルを', time: '2時間', costLevel: 3, bestTime: 'evening' },
      { name: 'タイ式マッサージ', genre: 'activity', description: '本場のタイ古式マッサージで極楽体験', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'ジム・トンプソンの家', genre: 'art', description: 'タイシルク王の邸宅で伝統美術を鑑賞', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'ダムヌンサドゥアック水上市場', genre: 'sightseeing', description: '船の上で買い物するタイの伝統的な市場体験', time: '3時間', costLevel: 2, bestTime: 'morning' },
    ],
    localFood: [
      { name: 'パッタイ', description: 'タイ風焼きそば。屋台の味が一番美味しい' },
      { name: 'トムヤムクン', description: '酸っぱ辛いエビのスープは世界三大スープの一つ' },
      { name: 'ガパオライス', description: 'バジル炒めご飯に目玉焼きを乗せて' },
      { name: 'カオマンガイ', description: 'ジューシーな茹で鶏とご飯のシンプルな絶品料理' },
      { name: 'マンゴースティッキーライス', description: '甘いもち米と完熟マンゴーの最高コンビ' },
    ],
    tips: [
      'BTS（スカイトレイン）とMRT（地下鉄）を使いこなすと移動が楽',
      'タクシーは必ずメーターを使ってもらおう。交渉制は割高になるよ',
      '寺院に行くときは肩と膝が隠れる服装が必須',
      '屋台のご飯は安くて美味い！50-100バーツで食べられる',
      '暑さ対策に水分補給はこまめに。コンビニの水が安いよ',
    ],
  },
  hawaii: {
    name: 'ハワイ',
    nameEn: 'Hawaii',
    emoji: '🌺',
    spots: [
      { name: 'ワイキキビーチ', genre: 'nature', description: '世界で最も有名なビーチでのんびり海水浴', time: '3時間', costLevel: 1, bestTime: 'morning' },
      { name: 'ダイヤモンドヘッド', genre: 'activity', description: '片道40分のハイキングで山頂からの絶景を堪能', time: '2.5時間', costLevel: 1, bestTime: 'morning' },
      { name: 'カイルア・ラニカイビーチ', genre: 'nature', description: '地元っ子が愛するエメラルドグリーンの秘密ビーチ', time: '3時間', costLevel: 1, bestTime: 'morning' },
      { name: 'ノースショア', genre: 'sightseeing', description: 'サーファーの聖地でガーリックシュリンプを食べよう', time: '4時間', costLevel: 2, bestTime: 'morning' },
      { name: 'アラモアナセンター', genre: 'shopping', description: '世界最大級のオープンエアショッピングモール', time: '3時間', costLevel: 2, bestTime: 'afternoon' },
      { name: 'パールハーバー', genre: 'culture', description: '歴史を学ぶ大切な場所。アリゾナ記念館は必見', time: '3時間', costLevel: 1, bestTime: 'morning' },
      { name: 'ハナウマ湾', genre: 'activity', description: '透明度抜群の海でシュノーケリング', time: '3時間', costLevel: 2, bestTime: 'morning' },
      { name: 'クアロア牧場', genre: 'activity', description: '映画のロケ地でジープツアーや乗馬体験', time: '4時間', costLevel: 3, bestTime: 'morning' },
      { name: 'KCCファーマーズマーケット', genre: 'food', description: '土曜朝限定のローカルグルメ市場', time: '2時間', costLevel: 2, bestTime: 'morning' },
      { name: 'マノアの滝', genre: 'nature', description: '熱帯雨林を歩いて美しい滝に到着するトレッキング', time: '2時間', costLevel: 1, bestTime: 'morning' },
    ],
    localFood: [
      { name: 'ポケ丼', description: 'マグロやサーモンの漬け丼。ハワイのソウルフード' },
      { name: 'ロコモコ', description: 'ハンバーグと目玉焼きとグレイビーソースのご飯' },
      { name: 'ガーリックシュリンプ', description: 'ノースショアの名物！ニンニクたっぷりエビ' },
      { name: 'アサイーボウル', description: 'フルーツたっぷりのヘルシー朝食' },
      { name: 'マラサダ', description: 'ポルトガル由来の揚げドーナツ。レナーズが有名' },
      { name: 'シェイブアイス', description: 'ふわふわの氷にカラフルなシロップをかけた氷菓' },
    ],
    tips: [
      'レンタカーがあるとノースショアやカイルアにも行けて便利',
      '日焼け止めはリーフセーフ（サンゴに優しい）のものを使おう',
      'チップ文化があるからレストランでは15-20%が目安',
      '朝の時間帯が空いていて気温も快適だからアクティビティは午前中に',
      'ABCストア（コンビニ）が至る所にあるから便利',
    ],
  },
  nagoya: {
    name: '名古屋',
    nameEn: 'Nagoya',
    emoji: '🏰',
    spots: [
      { name: '名古屋城', genre: 'culture', description: '金のシャチホコで有名な天下の名城', time: '2時間', costLevel: 2, bestTime: 'morning' },
      { name: '熱田神宮', genre: 'culture', description: '三種の神器の一つを祀る由緒ある神社', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '大須商店街', genre: 'shopping', description: '食べ歩きにもショッピングにも最高の活気ある商店街', time: '2.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'リニア・鉄道館', genre: 'activity', description: '歴代の新幹線や蒸気機関車が展示された鉄道ファン必見スポット', time: '2.5時間', costLevel: 2, bestTime: 'morning' },
      { name: 'オアシス21', genre: 'sightseeing', description: '水の宇宙船と呼ばれるガラスの大屋根が印象的', time: '1時間', costLevel: 1, bestTime: 'evening' },
      { name: '徳川美術館', genre: 'art', description: '尾張徳川家の名宝を展示する美術館', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'ひつまぶし', description: 'うなぎを3通りの食べ方で楽しむ名古屋の贅沢メシ' },
      { name: '味噌カツ', description: '濃厚な八丁味噌ダレがかかったカツ' },
      { name: '手羽先', description: '世界の山ちゃんか風来坊、どっち派？' },
      { name: 'きしめん', description: '平べったい麺にかつお出汁が絶妙' },
    ],
    tips: [
      '名古屋駅から主要スポットは地下鉄ですぐアクセスできるよ',
      '名古屋めしの食べ歩きだけで1日使えるレベル',
      '大須商店街は裏道にも面白い店が隠れてるから探検してみて',
    ],
  },
  kamakura: {
    name: '鎌倉',
    nameEn: 'Kamakura',
    emoji: '🧘',
    spots: [
      { name: '鎌倉大仏（高徳院）', genre: 'culture', description: '高さ13mの国宝ブロンズ大仏', time: '1時間', costLevel: 1, bestTime: 'morning' },
      { name: '鶴岡八幡宮', genre: 'culture', description: '鎌倉幕府ゆかりの歴史ある神社', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '江ノ島', genre: 'nature', description: '展望台・岩屋・シラス丼が楽しめる小さな島', time: '3時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '長谷寺', genre: 'culture', description: 'あじさいの名所。海を見下ろす眺望が素敵', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '小町通り', genre: 'food', description: '食べ歩きと雑貨屋さん巡りが楽しい参道', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '報国寺（竹の寺）', genre: 'nature', description: '約2000本の竹林で抹茶を味わう至福の時間', time: '1時間', costLevel: 1, bestTime: 'morning' },
    ],
    localFood: [
      { name: 'しらす丼', description: '生しらすと釜揚げしらすのハーフ&ハーフがおすすめ' },
      { name: '鎌倉ビール', description: 'クラフトビールを飲みながら散策' },
      { name: '鳩サブレー', description: '鎌倉土産の定番中の定番' },
    ],
    tips: [
      '江ノ電の1日乗車券「のりおりくん」が便利でお得',
      '休日は混むから平日がおすすめ。特に小町通りは激混み',
      '鎌倉→江ノ島は江ノ電で移動すると海沿いの景色が最高',
    ],
  },
  hiroshima: {
    name: '広島',
    nameEn: 'Hiroshima',
    emoji: '☮️',
    spots: [
      { name: '平和記念公園・原爆ドーム', genre: 'culture', description: '平和の大切さを学ぶ世界遺産', time: '2.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '宮島・厳島神社', genre: 'culture', description: '海に浮かぶ大鳥居は日本三景の一つ', time: '4時間', costLevel: 2, bestTime: 'morning' },
      { name: '広島城', genre: 'culture', description: '復元された天守閣からの街の眺めが良い', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'おりづるタワー', genre: 'sightseeing', description: '原爆ドームを上から見下ろす展望スポット', time: '1時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '縮景園', genre: 'nature', description: '回遊式庭園で四季の花と抹茶を楽しむ', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'お好み村', genre: 'food', description: '広島お好み焼きの名店が集まるフードビル', time: '1.5時間', costLevel: 1, bestTime: 'evening' },
    ],
    localFood: [
      { name: '広島お好み焼き', description: '麺が入った重ね焼きスタイル。大阪とは別物！' },
      { name: '牡蠣料理', description: '宮島の焼き牡蠣は冬の味覚の王様' },
      { name: 'あなご飯', description: '宮島名物。ふっくら焼いたあなごが美味' },
      { name: 'もみじ饅頭', description: '広島土産の大定番。揚げもみじも試してみて' },
    ],
    tips: [
      '宮島はフェリーで約10分。JRのフェリーなら青春18きっぷでも乗れるよ',
      '満潮時に厳島神社の大鳥居が海に浮かぶ姿を見るのがベスト',
      '広島駅から路面電車でほとんどの観光地に行ける',
    ],
  },
  kanazawa: {
    name: '金沢',
    nameEn: 'Kanazawa',
    emoji: '🎨',
    spots: [
      { name: '兼六園', genre: 'nature', description: '日本三名園の一つ。どの季節も美しい', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '金沢21世紀美術館', genre: 'art', description: 'スイミング・プールのアート作品が有名', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
      { name: 'ひがし茶屋街', genre: 'culture', description: '金箔ソフトクリームを食べながら風情ある街歩き', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '近江町市場', genre: 'food', description: '金沢の台所で海鮮丼やのどぐろを堪能', time: '1.5時間', costLevel: 2, bestTime: 'morning' },
      { name: '金沢城公園', genre: 'culture', description: '加賀百万石の歴史を感じる壮大な城跡', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: '長町武家屋敷跡', genre: 'culture', description: '土塀と石畳が続く江戸時代の武家屋敷エリア', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'のどぐろ', description: '白身のトロと呼ばれる高級魚。塩焼きが絶品' },
      { name: '金沢カレー', description: 'ステンレス皿にキャベツとカツが乗る独特スタイル' },
      { name: '治部煮', description: '加賀藩の伝統料理。鶏肉と野菜のとろみ煮' },
      { name: '金箔ソフトクリーム', description: '金沢ならではの映えスイーツ' },
    ],
    tips: [
      '金沢は街がコンパクトだから徒歩とバスで十分回れるよ',
      '兼六園は早朝無料開放があるから早起きがお得',
      '北陸新幹線で東京から約2.5時間。日帰りもギリギリ可能',
    ],
  },
  kobe: {
    name: '神戸',
    nameEn: 'Kobe',
    emoji: '🌃',
    spots: [
      { name: '北野異人館街', genre: 'culture', description: '明治時代の洋館が並ぶ異国情緒あふれるエリア', time: '2.5時間', costLevel: 2, bestTime: 'morning' },
      { name: 'メリケンパーク', genre: 'sightseeing', description: 'ポートタワーとBE KOBEモニュメントがフォトスポット', time: '1.5時間', costLevel: 1, bestTime: 'evening' },
      { name: '南京町', genre: 'food', description: '日本三大中華街の一つで食べ歩き', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '有馬温泉', genre: 'activity', description: '日本最古の温泉の一つ。金泉・銀泉を楽しもう', time: '3時間', costLevel: 2, bestTime: 'afternoon' },
      { name: '神戸ハーバーランド', genre: 'shopping', description: '港町の夜景を眺めながらショッピング', time: '2時間', costLevel: 2, bestTime: 'evening' },
      { name: '六甲山', genre: 'nature', description: '1000万ドルの夜景と呼ばれる神戸の絶景スポット', time: '3時間', costLevel: 2, bestTime: 'evening' },
    ],
    localFood: [
      { name: '神戸牛ステーキ', description: '世界に名を馳せる最高級和牛のステーキ' },
      { name: '神戸スイーツ', description: 'パティスリーの聖地。ケーキのレベルが段違い' },
      { name: '明石焼き', description: '出汁につけて食べるふわトロの明石名物' },
      { name: '中華まん', description: '南京町の豚まんは食べ歩きの定番' },
    ],
    tips: [
      '大阪から阪急電車で約30分。日帰りでも十分楽しめる',
      '神戸牛は高いけど、ランチなら比較的リーズナブルに食べられるよ',
      '有馬温泉は市街地からバスで30分。意外と近い',
    ],
  },
  nagasaki: {
    name: '長崎',
    nameEn: 'Nagasaki',
    emoji: '⛪',
    spots: [
      { name: 'グラバー園', genre: 'culture', description: '異国情緒あふれる洋風庭園と歴史的建造物', time: '2時間', costLevel: 2, bestTime: 'morning' },
      { name: '平和公園・原爆資料館', genre: 'culture', description: '平和の大切さを伝える祈りの場所', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '稲佐山', genre: 'sightseeing', description: '世界新三大夜景に選ばれた絶景スポット', time: '2時間', costLevel: 1, bestTime: 'evening' },
      { name: '大浦天主堂', genre: 'culture', description: '国宝に指定された日本最古の木造ゴシック教会', time: '1時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '出島', genre: 'culture', description: '鎖国時代の貿易の歴史を体感できる復元エリア', time: '1.5時間', costLevel: 1, bestTime: 'afternoon' },
      { name: '眼鏡橋', genre: 'sightseeing', description: '川面に映る姿がメガネに見える石造アーチ橋', time: '0.5時間', costLevel: 1, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'ちゃんぽん', description: '具沢山の長崎名物麺。リンガーハットとは別格！' },
      { name: '皿うどん', description: 'パリパリ麺にとろみあんが絡む長崎流' },
      { name: 'カステラ', description: 'しっとりふわふわの長崎スイーツの代表格' },
      { name: 'トルコライス', description: 'ピラフ・スパゲティ・カツの三位一体プレート' },
    ],
    tips: [
      '長崎は坂が多い！歩きやすい靴が必須だよ',
      '路面電車の1日乗車券（600円）が便利でお得',
      '稲佐山の夜景はロープウェイで行くのがおすすめ',
    ],
  },
  singapore: {
    name: 'シンガポール',
    nameEn: 'Singapore',
    emoji: '🇸🇬',
    spots: [
      { name: 'マリーナベイサンズ', genre: 'sightseeing', description: '屋上のインフィニティプールと展望デッキが圧巻', time: '2時間', costLevel: 3, bestTime: 'evening' },
      { name: 'ガーデンズ・バイ・ザ・ベイ', genre: 'nature', description: '近未来的なスーパーツリーのライトショーは必見', time: '2.5時間', costLevel: 2, bestTime: 'evening' },
      { name: 'チャイナタウン', genre: 'food', description: 'ホーカーズ（屋台街）で安くて美味いローカルフード', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'セントーサ島', genre: 'activity', description: 'ユニバーサルスタジオやビーチがある島リゾート', time: '5時間', costLevel: 3, bestTime: 'morning' },
      { name: 'リトルインディア', genre: 'culture', description: 'カラフルな建物とスパイスの香りが異国感満点', time: '2時間', costLevel: 1, bestTime: 'afternoon' },
      { name: 'オーチャードロード', genre: 'shopping', description: 'ブランドショップが並ぶシンガポール最大の繁華街', time: '3時間', costLevel: 3, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'チキンライス', description: 'シンガポールの国民食。天天海南鶏飯が有名' },
      { name: 'チリクラブ', description: '甘辛いチリソースで食べる丸ごとカニ料理' },
      { name: 'ラクサ', description: 'ココナッツカレー味のスパイシー麺' },
      { name: 'カヤトースト', description: 'ココナッツジャムとバターのトースト。朝食の定番' },
    ],
    tips: [
      'MRT（地下鉄）が便利で安い。EZリンクカードを買おう',
      'ホーカーズ（屋台街）は安くて美味い。1食500円以下で食べられる',
      '室内はエアコンが効きすぎるから羽織ものを持っていこう',
    ],
  },
  vietnam: {
    name: 'ベトナム（ホーチミン）',
    nameEn: 'Ho Chi Minh City',
    emoji: '🇻🇳',
    spots: [
      { name: 'ベンタイン市場', genre: 'shopping', description: '値段交渉が楽しい活気あふれる巨大市場', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: '統一会堂', genre: 'culture', description: 'ベトナム戦争の歴史を伝える旧大統領官邸', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: 'サイゴン大教会', genre: 'culture', description: 'フランス植民地時代の赤レンガの美しい教会', time: '0.5時間', costLevel: 1, bestTime: 'morning' },
      { name: 'ブイビエン通り', genre: 'city', description: 'バックパッカー通りでナイトライフを楽しむ', time: '2時間', costLevel: 1, bestTime: 'evening' },
      { name: 'クチトンネル', genre: 'culture', description: 'ベトナム戦争時の地下トンネルを体験', time: '3時間', costLevel: 1, bestTime: 'morning' },
      { name: 'メコン川クルーズ', genre: 'activity', description: '小舟でメコン川のジャングルを探検', time: '4時間', costLevel: 2, bestTime: 'morning' },
    ],
    localFood: [
      { name: 'フォー', description: '透き通ったスープとつるつる米麺のベトナム国民食' },
      { name: 'バインミー', description: 'フランスパンに肉やパクチーを挟んだベトナムサンド' },
      { name: '生春巻き', description: 'エビと野菜をライスペーパーで巻いたヘルシー料理' },
      { name: 'ベトナムコーヒー', description: '練乳入りの濃厚アイスコーヒーがクセになる' },
    ],
    tips: [
      'バイクの量がすごいけど、現地の人に合わせてゆっくり渡ればOK',
      'Grabアプリ（配車アプリ）が安全で便利。ぼったくりの心配なし',
      '物価がかなり安い。ローカルフードなら1食200円くらい',
    ],
  },
  bali: {
    name: 'バリ島',
    nameEn: 'Bali',
    emoji: '🌴',
    spots: [
      { name: 'ウブドのライステラス', genre: 'nature', description: '棚田の絶景が広がるバリの原風景', time: '2時間', costLevel: 1, bestTime: 'morning' },
      { name: 'タナロット寺院', genre: 'culture', description: '海に浮かぶ寺院のシルエットが夕日に映える', time: '2時間', costLevel: 1, bestTime: 'evening' },
      { name: 'ウルワツ寺院', genre: 'culture', description: '断崖絶壁の寺院でケチャダンスを鑑賞', time: '2.5時間', costLevel: 1, bestTime: 'evening' },
      { name: 'スミニャックビーチ', genre: 'nature', description: 'おしゃれなビーチクラブでサンセットを楽しむ', time: '3時間', costLevel: 2, bestTime: 'evening' },
      { name: 'モンキーフォレスト', genre: 'nature', description: '猿たちが暮らす神聖な森を散策', time: '1.5時間', costLevel: 1, bestTime: 'morning' },
      { name: 'バリ式スパ', genre: 'activity', description: '花びらを浮かべたフラワーバスでリラックス', time: '2時間', costLevel: 2, bestTime: 'afternoon' },
    ],
    localFood: [
      { name: 'ナシゴレン', description: 'インドネシア風チャーハン。甘辛い味付けが最高' },
      { name: 'ミーゴレン', description: 'インドネシア風焼きそば。屋台の定番' },
      { name: 'バビグリン', description: '豚の丸焼き。バリの祝祭料理' },
      { name: 'ルアックコーヒー', description: '世界一高価と言われる幻のコーヒー' },
    ],
    tips: [
      '移動はGrabかチャーター車が安くて便利',
      '寺院に入るときはサロン（腰巻き）を借りる必要があるよ',
      'ウブドとビーチエリアは車で1-1.5時間離れてるから注意',
    ],
  },
};

// --- Budget Ranges ---
const BUDGET_RANGES = {
  low: { label: '節約', daily: { domestic: 8000, asia: 5000, western: 15000 }, emoji: '💰' },
  medium: { label: 'ふつう', daily: { domestic: 15000, asia: 10000, western: 25000 }, emoji: '💳' },
  high: { label: 'リッチ', daily: { domestic: 25000, asia: 18000, western: 40000 }, emoji: '💎' },
  luxury: { label: '超リッチ', daily: { domestic: 40000, asia: 30000, western: 60000 }, emoji: '👑' },
};

// --- Packing Lists ---
const PACKING_LISTS = {
  domestic: {
    essentials: ['着替え', '下着', 'スマホ充電器', '財布', '保険証コピー', 'モバイルバッテリー'],
    comfort: ['折りたたみ傘', 'エコバッグ', 'ウェットティッシュ', 'マスク'],
    summer: ['日焼け止め', 'サングラス', '帽子', '制汗シート'],
    winter: ['マフラー', '手袋', 'カイロ', '厚手のコート'],
  },
  asia: {
    essentials: ['パスポート', 'スマホ充電器', '変換プラグ', 'クレジットカード', '海外保険証書', 'モバイルバッテリー'],
    comfort: ['折りたたみ傘', 'ウェットティッシュ', 'ポケットティッシュ', '虫除けスプレー', 'マスク'],
    summer: ['日焼け止め', 'サングラス', '帽子', '薄手の羽織もの（冷房対策）'],
    winter: ['薄手のジャケット', 'ストール'],
  },
  western: {
    essentials: ['パスポート', 'スマホ充電器', '変換プラグ', 'クレジットカード', '海外保険証書', 'モバイルバッテリー', 'eSIM or Wi-Fiルーター'],
    comfort: ['スリッパ（機内・ホテル用）', 'アイマスク', 'ネックピロー', 'エコバッグ', 'マスク'],
    summer: ['日焼け止め', 'サングラス', '帽子'],
    winter: ['厚手のコート', 'マフラー', '手袋', 'ヒートテック'],
  },
};

// --- Helper functions ---
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

function getDestinationType(key) {
  const domestic = ['tokyo', 'osaka', 'kyoto', 'hokkaido', 'okinawa', 'fukuoka', 'nagoya', 'kamakura', 'hiroshima', 'kanazawa', 'kobe', 'nagasaki'];
  const asia = ['seoul', 'taipei', 'bangkok', 'singapore', 'vietnam', 'bali'];
  if (domestic.includes(key)) return 'domestic';
  if (asia.includes(key)) return 'asia';
  return 'western';
}

function getSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 6 && month <= 9) return 'summer';
  if (month >= 11 || month <= 2) return 'winter';
  return 'summer'; // default to summer for spring/autumn
}

function formatCurrency(amount, type) {
  if (type === 'domestic') return `¥${amount.toLocaleString()}`;
  return `¥${amount.toLocaleString()}（目安）`;
}

// --- Time slot helpers ---
const TIME_SLOTS = {
  morning: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30'],
  late_morning: ['10:30', '11:00', '11:30'],
  lunch: ['12:00', '12:30'],
  afternoon: ['13:30', '14:00', '14:30', '15:00', '15:30'],
  late_afternoon: ['16:00', '16:30'],
  evening: ['17:00', '17:30', '18:00', '18:30', '19:00'],
};

function pickTime(slot) {
  const times = TIME_SLOTS[slot] || TIME_SLOTS.morning;
  return times[Math.floor(Math.random() * times.length)];
}

// --- Meal suggestions ---
function getMealSuggestion(dest, mealType) {
  const foods = dest.localFood;
  const food = foods[Math.floor(Math.random() * foods.length)];
  const labels = {
    breakfast: '朝ごはん',
    lunch: 'ランチ',
    dinner: 'ディナー',
  };
  return {
    label: labels[mealType],
    food: food,
  };
}

// --- Activity tips ---
const ACTIVITY_TIPS = [
  '混雑を避けるなら開場直後がおすすめ',
  '写真映えスポットが多いからカメラの準備を忘れずに',
  '歩きやすい靴で行こう',
  '近くにカフェがあるから休憩もできるよ',
  '天気が良い日は特に景色が最高',
  '地元の人に話しかけると穴場情報が聞けるかも',
  'お土産もここで買えるよ',
  '周辺の散策も楽しいからちょっと余裕を持って',
  '事前予約すると待ち時間を短縮できるよ',
  '水分補給を忘れずにね',
];

function getRandomTip() {
  return ACTIVITY_TIPS[Math.floor(Math.random() * ACTIVITY_TIPS.length)];
}

// --- Core logic ---

function generatePlan() {
  const dest = DESTINATIONS[state.destination];
  if (!dest) return null;

  // Filter spots by selected genres
  let filteredSpots = dest.spots.filter(s => state.genres.includes(s.genre));

  // If not enough spots, add some from other genres
  if (filteredSpots.length < state.days * 2) {
    const otherSpots = dest.spots.filter(s => !state.genres.includes(s.genre));
    const needed = Math.max(0, state.days * 3 - filteredSpots.length);
    filteredSpots = [...filteredSpots, ...pickRandom(otherSpots, needed)];
  }

  // Shuffle for variety
  filteredSpots = shuffle(filteredSpots);

  // Determine spots per day based on pace
  const spotsPerDay = {
    relaxed: { min: 2, max: 3 },
    normal: { min: 3, max: 4 },
    active: { min: 4, max: 5 },
  };
  const pace = spotsPerDay[state.pace] || spotsPerDay.normal;

  // Distribute spots across days
  const days = [];
  let spotIndex = 0;

  for (let d = 0; d < state.days; d++) {
    const numSpots = Math.min(
      pace.min + Math.floor(Math.random() * (pace.max - pace.min + 1)),
      filteredSpots.length - spotIndex
    );

    const daySpots = filteredSpots.slice(spotIndex, spotIndex + numSpots);
    spotIndex += numSpots;

    // Build timeline
    const timeline = [];
    const usedFoods = new Set();

    // Morning activity
    if (daySpots.length > 0) {
      timeline.push({
        time: pickTime('morning'),
        place: daySpots[0].name,
        description: daySpots[0].description,
        tip: getRandomTip(),
        type: 'activity',
      });
    }

    // Late morning activity (if active pace)
    if (daySpots.length > 2) {
      timeline.push({
        time: pickTime('late_morning'),
        place: daySpots[1].name,
        description: daySpots[1].description,
        tip: getRandomTip(),
        type: 'activity',
      });
    }

    // Lunch
    let lunchFood = dest.localFood[Math.floor(Math.random() * dest.localFood.length)];
    usedFoods.add(lunchFood.name);
    timeline.push({
      time: pickTime('lunch'),
      place: `ランチ：${lunchFood.name}`,
      description: lunchFood.description,
      tip: '地元の人気店を探してみて！',
      type: 'meal',
    });

    // Afternoon activities
    const afternoonStart = daySpots.length > 2 ? 2 : 1;
    for (let i = afternoonStart; i < Math.min(daySpots.length, afternoonStart + 2); i++) {
      timeline.push({
        time: pickTime('afternoon'),
        place: daySpots[i].name,
        description: daySpots[i].description,
        tip: getRandomTip(),
        type: 'activity',
      });
    }

    // Dinner
    let dinnerFood;
    do {
      dinnerFood = dest.localFood[Math.floor(Math.random() * dest.localFood.length)];
    } while (usedFoods.has(dinnerFood.name) && dest.localFood.length > 1);

    timeline.push({
      time: pickTime('evening'),
      place: `ディナー：${dinnerFood.name}`,
      description: dinnerFood.description,
      tip: '予約しておくと安心だよ',
      type: 'meal',
    });

    // Last activity for evening (if enough spots)
    const remaining = daySpots.length > 2 ? daySpots.length - afternoonStart - 2 : daySpots.length - afternoonStart - 1;
    if (remaining > 0) {
      const lastSpot = daySpots[daySpots.length - 1];
      if (lastSpot && !timeline.some(t => t.place === lastSpot.name)) {
        timeline.push({
          time: pickTime('evening'),
          place: lastSpot.name,
          description: lastSpot.description,
          tip: getRandomTip(),
          type: 'activity',
        });
      }
    }

    // Sort timeline by time
    timeline.sort((a, b) => a.time.localeCompare(b.time));

    days.push({
      dayNumber: d + 1,
      label: d === 0 ? '到着日' : d === state.days - 1 ? '最終日' : `${d + 1}日目`,
      timeline: timeline,
    });
  }

  return {
    destination: dest,
    days: days,
    budget: calculateBudget(dest),
    checklist: getChecklist(),
    tips: pickRandom(dest.tips, Math.min(3, dest.tips.length)),
  };
}

function calculateBudget(dest) {
  const type = getDestinationType(state.destination);
  const budgetData = BUDGET_RANGES[state.budget];
  const dailyAmount = budgetData.daily[type];
  const totalDays = state.days;

  const transport = Math.round(dailyAmount * 0.25);
  const accommodation = Math.round(dailyAmount * 0.35);
  const food = Math.round(dailyAmount * 0.25);
  const activities = Math.round(dailyAmount * 0.15);

  return {
    transport: { daily: transport, total: transport * totalDays },
    accommodation: { daily: accommodation, total: accommodation * totalDays },
    food: { daily: food, total: food * totalDays },
    activities: { daily: activities, total: activities * totalDays },
    total: dailyAmount * totalDays,
    type: type,
  };
}

function getChecklist() {
  const type = getDestinationType(state.destination);
  const season = getSeason();
  const list = PACKING_LISTS[type];
  return {
    essentials: list.essentials,
    comfort: list.comfort,
    seasonal: list[season] || [],
  };
}

// --- Render functions ---

function renderDayCards(plan) {
  const container = document.getElementById('day-cards');
  if (!container) return;
  container.innerHTML = '';

  plan.days.forEach((day, idx) => {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.style.animationDelay = `${idx * 100}ms`;

    const timelineHTML = day.timeline.map(item => `
      <div class="timeline-item">
        <span class="timeline-time">${item.time}</span>
        <div class="timeline-place">${item.type === 'meal' ? '🍽️ ' : '📍 '}${item.place}</div>
        <div class="timeline-desc">${item.description}</div>
        <span class="timeline-tip">💡 ${item.tip}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="day-card__header">
        <div class="day-card__number">${day.dayNumber}</div>
        <div class="day-card__label">${day.label}</div>
      </div>
      <div class="day-card__body">
        <div class="timeline">
          ${timelineHTML}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderBudgetSummary(plan) {
  const container = document.getElementById('budget-summary');
  if (!container) return;

  const b = plan.budget;
  const type = b.type;

  container.innerHTML = `
    <div class="budget-card__title">💰 予算の目安（${state.days}日間）</div>
    <div class="budget-row">
      <span class="budget-label">🚃 交通費</span>
      <span class="budget-value">${formatCurrency(b.transport.total, type)}</span>
    </div>
    <div class="budget-row">
      <span class="budget-label">🏨 宿泊費</span>
      <span class="budget-value">${formatCurrency(b.accommodation.total, type)}</span>
    </div>
    <div class="budget-row">
      <span class="budget-label">🍽️ 食費</span>
      <span class="budget-value">${formatCurrency(b.food.total, type)}</span>
    </div>
    <div class="budget-row">
      <span class="budget-label">🎫 アクティビティ</span>
      <span class="budget-value">${formatCurrency(b.activities.total, type)}</span>
    </div>
    <div class="budget-row total">
      <span class="budget-label">合計（目安）</span>
      <span class="budget-value">${formatCurrency(b.total, type)}</span>
    </div>
  `;
}

function renderChecklist(plan) {
  const container = document.getElementById('checklist');
  if (!container) return;

  const cl = plan.checklist;

  const renderCategory = (name, items) => {
    if (!items || items.length === 0) return '';
    return `
      <div class="checklist-category">
        <div class="checklist-category__name">${name}</div>
        <div class="checklist-items">
          ${items.map(item => `<span class="checklist-item">☐ ${item}</span>`).join('')}
        </div>
      </div>
    `;
  };

  container.innerHTML = `
    <div class="checklist-card__title">🎒 持ち物チェックリスト</div>
    ${renderCategory('必須アイテム', cl.essentials)}
    ${renderCategory('あると便利', cl.comfort)}
    ${renderCategory('季節アイテム', cl.seasonal)}
  `;
}

function renderTips(plan) {
  const container = document.getElementById('tips-section');
  if (!container) return;

  container.innerHTML = `
    <div class="checklist-card__title">📝 旅のコツ</div>
    ${plan.tips.map(tip => `<div style="padding: 6px 0; font-size: var(--font-size-sm); color: var(--color-text-light);">✅ ${tip}</div>`).join('')}
  `;
}

// --- Copy function ---
function copyPlan() {
  const plan = generatePlan();
  if (!plan) return;

  const dest = plan.destination;
  let text = `✈️ ${dest.emoji} ${dest.name}（${dest.nameEn}）旅行プラン\n`;
  text += `📅 ${state.days}日間 | 👥 ${getCompanionLabel(state.companion)} | ⏱️ ${getPaceLabel(state.pace)}\n`;
  text += `${'─'.repeat(30)}\n\n`;

  plan.days.forEach(day => {
    text += `【Day ${day.dayNumber} - ${day.label}】\n`;
    day.timeline.forEach(item => {
      text += `  ${item.time} ${item.place}\n`;
      text += `       ${item.description}\n`;
      text += `       💡 ${item.tip}\n`;
    });
    text += '\n';
  });

  text += `${'─'.repeat(30)}\n`;
  text += `💰 予算目安: ${formatCurrency(plan.budget.total, plan.budget.type)}（${state.days}日間合計）\n`;
  text += `\n🎒 持ち物:\n`;
  const cl = plan.checklist;
  [...cl.essentials, ...cl.comfort, ...cl.seasonal].forEach(item => {
    text += `  ☐ ${item}\n`;
  });

  text += `\n📝 旅のコツ:\n`;
  plan.tips.forEach(tip => {
    text += `  ✅ ${tip}\n`;
  });

  text += `\n--- 旅行プランナーで作成 ---`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.classList.add('copied');
      btn.innerHTML = '<span>✅</span> コピーしました！';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<span>📋</span> プランをコピー';
      }, 2000);
    }
  }).catch(() => {
    showError('コピーに失敗しました。手動でコピーしてください。');
  });
}

// --- Label helpers ---
function getCompanionLabel(val) {
  const labels = { solo: 'ひとり旅', couple: 'カップル', friends: '友達と', family: '家族と' };
  return labels[val] || val;
}

function getPaceLabel(val) {
  const labels = { relaxed: 'ゆったり', normal: 'ふつう', active: 'アクティブ' };
  return labels[val] || val;
}

// --- UI functions ---

function goToStep(step) {
  // Read current form values
  const destEl = document.getElementById('input-destination');
  if (destEl) state.destination = destEl.value;
  const daysEl = document.getElementById('input-days');
  if (daysEl) state.days = parseInt(daysEl.value, 10) || 0;
  const budgetEl = document.getElementById('input-budget');
  if (budgetEl && budgetEl.value) state.budget = budgetEl.value;

  // Validation before moving forward
  if (step > state.currentStep) {
    if (state.currentStep === 1) {
      if (!state.destination) { showError('行き先を選んでね！'); return; }
      if (!state.days || state.days < 1) { showError('日数を選んでね！'); return; }
    }
  }

  state.currentStep = step;
  clearError();

  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    if (indicator) {
      indicator.classList.remove('t-step--active', 't-step--done');
      if (i < step) indicator.classList.add('t-step--done');
      if (i === step) indicator.classList.add('t-step--active');
    }
    const line = document.getElementById(`step-line-${i}`);
    if (line) {
      line.style.background = i < step ? 'var(--color-success)' : 'var(--color-border)';
    }
  }

  // Show/hide step sections
  document.querySelectorAll('.step-section').forEach(section => {
    section.classList.add('hidden');
  });
  const target = document.getElementById(`step-${step}`);
  if (target) target.classList.remove('hidden');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // If step 3, generate and render the plan
  if (step === 3) {
    generateAndRender();
  }
}

function generate() {
  // Validate STEP 2
  if (state.genres.length === 0) {
    showError('興味のあるジャンルを1つ以上選んでね！');
    return;
  }
  if (!state.pace) {
    state.pace = 'normal'; // default
  }
  state.preference = (document.getElementById('input-preference') || {}).value || '';

  // Go to step 3
  goToStep(3);
}

function generateAndRender() {
  // Show loading
  const loading = document.getElementById('loading');
  const results = document.getElementById('results');
  if (loading) loading.classList.remove('hidden');
  if (results) results.classList.add('hidden');

  setTimeout(() => {
    const plan = generatePlan();
    if (!plan) {
      showError('プランの生成に失敗しました。最初からやり直してください。');
      return;
    }

    renderDayCards(plan);
    renderBudgetSummary(plan);
    renderChecklist(plan);
    renderTips(plan);

    // Update result summary
    const summary = document.getElementById('result-summary');
    if (summary) {
      summary.textContent = `${plan.destination.emoji} ${plan.destination.name} / ${state.days}日間 / ${getCompanionLabel(state.companion)} / ${getPaceLabel(state.pace)}ペース`;
    }

    // Update share link
    const shareLink = document.getElementById('share-x');
    if (shareLink) {
      const shareText = encodeURIComponent(`${plan.destination.emoji} ${plan.destination.name}の旅行プランを作ったよ！\n\n旅プランジェネレーターで簡単に計画できた✨\n\nhttps://techio-code.github.io/travel-planner/\n\n#旅行 #旅行計画`);
      shareLink.href = `https://x.com/intent/tweet?text=${shareText}`;
    }

    if (loading) loading.classList.add('hidden');
    if (results) results.classList.remove('hidden');
  }, 1200);
}

function selectCompanion(el) {
  state.companion = el.dataset.companion;
  document.querySelectorAll('.companion-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  el.classList.add('selected');
}

function toggleGenre(el) {
  const value = el.dataset.genre;
  const idx = state.genres.indexOf(value);
  if (idx > -1) {
    state.genres.splice(idx, 1);
    el.classList.remove('selected');
  } else {
    if (state.genres.length >= 3) {
      showError('ジャンルは最大3つまでだよ！');
      return;
    }
    state.genres.push(value);
    el.classList.add('selected');
  }
  clearError();

  const counter = document.getElementById('genre-count');
  if (counter) {
    counter.textContent = state.genres.length;
  }
}

function selectPace(el) {
  state.pace = el.dataset.pace;
  document.querySelectorAll('.pace-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  el.classList.add('selected');
}

function showError(msg) {
  clearError();
  const container = document.querySelector('.step-section:not(.hidden)');
  if (!container) return;

  const el = document.createElement('div');
  el.className = 'error-msg';
  el.id = 'error-display';
  el.innerHTML = `<span>⚠️</span> ${msg}`;

  // Insert at the top of the active step section
  container.insertBefore(el, container.firstChild);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (el.parentNode) el.remove();
  }, 3000);
}

function clearError() {
  const existing = document.getElementById('error-display');
  if (existing) existing.remove();
}

function shareOnX() {
  const dest = DESTINATIONS[state.destination];
  if (!dest) return;
  const text = encodeURIComponent(
    `${dest.emoji} ${dest.name}（${dest.nameEn}）${state.days}日間の旅行プランを作ったよ！\n\n旅行プランナーで簡単に計画できた✨`
  );
  window.open(`https://x.com/intent/tweet?text=${text}`, '_blank');
}

function regeneratePlan() {
  generateAndRender();
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Destination select
  const destSelect = document.getElementById('input-destination');
  if (destSelect) {
    destSelect.addEventListener('change', (e) => {
      state.destination = e.target.value;
    });
  }

  // Days select
  const daysInput = document.getElementById('input-days');
  if (daysInput) {
    daysInput.addEventListener('change', (e) => {
      state.days = parseInt(e.target.value, 10) || 2;
    });
  }

  // Budget select
  const budgetSelect = document.getElementById('input-budget');
  if (budgetSelect) {
    budgetSelect.addEventListener('change', (e) => {
      state.budget = e.target.value;
    });
  }

  // Preference input
  const prefInput = document.getElementById('input-preference');
  if (prefInput) {
    prefInput.addEventListener('input', (e) => {
      state.preference = e.target.value;
    });
  }

  // Start at step 1
  goToStep(1);
});
