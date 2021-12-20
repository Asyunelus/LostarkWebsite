const CLASS_TYPE_SUPPORTER		= 1;
const CLASS_TYPE_MELEE_DEALER 	= 2;
const CLASS_TYPE_RANGED_DEALER 	= 3;
const CLASS_TYPE_MIXED_DEALER	= 4;
const CLASS_TYPE_NONE 			= 5;

const DAMAGE_ONCE			= 1;
const DAMAGE_CONTINUATION	= 2;
const DAMAGE_BOTH			= 3;

const CONTROL_VERYEASY		= 1;
const CONTROL_EASY			= 1;
const CONTROL_NORMAL		= 2;
const CONTROL_HARD			= 3;
const CONTROL_MAXIMUM		= 4;
const CONTROL_EXTRA			= 5;

const MOVE_LOW		= 1;
const MOVE_NORMAL	= 2;
const MOVE_HIGH		= 3;

//직업 클래스 설정. (직업추천에 사용하기 위한 함수 포함.)
class LostarkWork {
	constructor(id, name, classtype, health, defense, insikScore, controlScore, moveskillScore, damageScore) {
		this.id = id;
		this.name = name;
		this.classtype = classtype;
		this.health = health;
		this.defense = defense;
		this.insikScore = insikScore;
		this.controlScore = controlScore;
		this.moveskillScore = moveskillScore;
		this.damageScore = damageScore;
	}

	get supporter() {
		return this.classtype == 1;
	}

	get dealer() {
		return !this.supporter;
	}

	get ranged() {
		return this.classtype == 3 || this.classtype == 4;
	}

	get melee() {
		return this.dealer && (!this.ranged || this.classtype == 4);
	}
	
	get category() {
		return parseInt(this.id / 100);
	}

	get female() {
		return !this.male;
	}

	get male() {
		let res = false;
		switch(this.category) {
			case 1:
			case 5:
				res = true;
				break;
			case 2:
			case 3:
			case 4:
			case 6:
				res = false;
				break;
		}
		return this.genderlock ? !res : res;
	}

	get genderlock() {
		return parseInt(this.id / 10) % 10 > 0;
	}

	get woman() {
		return this.female && !this.children;
	}

	get man() {
		return this.male && !this.children;
	}

	get loli() {
		return this.female && this.children;
	}

	get shota() {
		return this.male && this.children;
	}

	get children() {
		return this.category == 6;
	}

	get recognize() {
		return 0 - this.insikScore;
	}
	
	get defenseScore() {
		return this.health * this.defense;
	}

	get defenceRank() {
		let score = this.defenseScore;
		if (score > 2.5) return 5;
		if (score > 2.2) return 4;
		if (score > 1.95) return 3;
		if (score > 1.85) return 2;
		return 1;
	}

	setRecognizeRank(rank) {
		this.recognizeRank = rank;
	}
}

//클래스 생성
const PLAYER_CLASS_WARRIOR 				= new LostarkWork(101, '전사(남)', CLASS_TYPE_NONE);

const PLAYER_CLASS_BERSERKER 			= new LostarkWork(102, '버서커', CLASS_TYPE_MELEE_DEALER, 2.2, 1.1, 2424, CONTROL_NORMAL, MOVE_NORMAL, DAMAGE_ONCE);
const PLAYER_CLASS_DESTROYER 			= new LostarkWork(103, '디스트로이어', CLASS_TYPE_MELEE_DEALER, 2.3, 1.15, 2860, CONTROL_HARD, MOVE_LOW, DAMAGE_CONTINUATION);
const PLAYER_CLASS_WARLORD 				= new LostarkWork(104, '워로드', CLASS_TYPE_MELEE_DEALER, 2.5, 1.2, 317, CONTROL_EASY, MOVE_LOW, DAMAGE_CONTINUATION);
//중갑3 적용기준임.
const PLAYER_CLASS_HOLYKNIGHT 			= new LostarkWork(105, '홀리나이트', CLASS_TYPE_SUPPORTER, 2.1, 2.2, 0, CONTROL_EASY, MOVE_NORMAL, DAMAGE_CONTINUATION);

const PLAYER_CLASS_MAGICIAN 			= new LostarkWork(201, '마법사(여)', CLASS_TYPE_NONE);

const PLAYER_CLASS_ARCANA 				= new LostarkWork(202, '아르카나', CLASS_TYPE_MELEE_DEALER, 2, 0.95, 1713, CONTROL_HARD, MOVE_NORMAL, DAMAGE_ONCE);
const PLAYER_CLASS_SUMMONER 			= new LostarkWork(203, '서머너', CLASS_TYPE_MIXED_DEALER, 2, 0.95, 446, CONTROL_NORMAL, MOVE_NORMAL, DAMAGE_CONTINUATION);
//중갑3 적용기준임
const PLAYER_CLASS_BARD 				= new LostarkWork(204, '바드', CLASS_TYPE_SUPPORTER, 1.9, 1.8, 0, CONTROL_EASY, MOVE_NORMAL, DAMAGE_CONTINUATION);
const PLAYER_CLASS_SORCERESS 			= new LostarkWork(205, '소서리스', CLASS_TYPE_RANGED_DEALER, 2, 0.95, 256, CONTROL_HARD, MOVE_NORMAL, DAMAGE_ONCE);

const PLAYER_CLASS_FIGHTER 				= new LostarkWork(301, '격투가(여)', CLASS_TYPE_NONE);

const PLAYER_CLASS_BATTLE_MASTER 		= new LostarkWork(302, '배틀마스터', CLASS_TYPE_MELEE_DEALER, 2.2, 1.05, 95, CONTROL_NORMAL, MOVE_HIGH, DAMAGE_CONTINUATION);
const PLAYER_CLASS_INFIGHTER 			= new LostarkWork(303, '인파이터', CLASS_TYPE_MELEE_DEALER, 2.3, 1.1, 888, CONTROL_NORMAL, MOVE_NORMAL, DAMAGE_CONTINUATION);
const PLAYER_CLASS_FORCE_MASTER 		= new LostarkWork(304, '기공사', CLASS_TYPE_MELEE_DEALER, 2.1, 1.05, 538, CONTROL_NORMAL. MOVE_HIGH, DAMAGE_ONCE);
const PLAYER_CLASS_LANCE_MASTER 		= new LostarkWork(305, '창술사', CLASS_TYPE_MIXED_DEALER, 2.2, 1.05, 111, CONTROL_NORMAL, MOVE_HIGH, DAMAGE_BOTH);

const PLAYER_CLASS_FIGHTER_MALE			= new LostarkWork(311, '격투가(남)', CLASS_TYPE_NONE);

const PLAYER_CLASS_BATTLE_MASTER_MALE 	= new LostarkWork(312, '스트라이커', CLASS_TYPE_MELEE_DEALER, 2.2, 1.05, 682, CONTROL_NORMAL, MOVE_HIGH, DAMAGE_BOTH);

const PLAYER_CLASS_DELAIN 				= new LostarkWork(401, '암살자(여)', CLASS_TYPE_NONE);

const PLAYER_CLASS_BLADE				= new LostarkWork(402, '블레이드', CLASS_TYPE_MELEE_DEALER, 2.2, 1, 253, CONTROL_NORMAL, MOVE_NORMAL, DAMAGE_BOTH);
const PLAYER_CLASS_DEMONIC				= new LostarkWork(403, '데모닉', CLASS_TYPE_MELEE_DEALER, 2.1, 0.95, 575, CONTROL_EASY, MOVE_NORMAL, DAMAGE_CONTINUATION);
const PLAYER_CLASS_REAPER				= new LostarkWork(404, '리퍼', CLASS_TYPE_MELEE_DEALER, 2, 0.9, 7038, CONTROL_HARD, MOVE_HIGH, DAMAGE_ONCE);

const PLAYER_CLASS_HUNTER				= new LostarkWork(501, '헌터(남)', CLASS_TYPE_NONE);

const PLAYER_CLASS_HAWK_EYE				= new LostarkWork(502, '호크아이', CLASS_TYPE_RANGED_DEALER, 2, 0.95, 283, CONTROL_NORMAL, MOVE_NORMAL, DAMAGE_CONTINUATION);
const PLAYER_CLASS_DEVIL_HUNTER			= new LostarkWork(503, '데빌헌터', CLASS_TYPE_RANGED_DEALER, 2, 0.9, 797, CONTROL_HARD, MOVE_HIGH, DAMAGE_ONCE);
const PLAYER_CLASS_BLASTER				= new LostarkWork(504, '블래스터', CLASS_TYPE_RANGED_DEALER, 2.1, 0.95, 2424, CONTROL_NORMAL, MOVE_NORMAL, DAMAGE_CONTINUATION);
const PLAYER_CLASS_SCOUTER				= new LostarkWork(505, '스카우터', CLASS_TYPE_RANGED_DEALER, 2, 0.9, 379, CONTROL_EASY, MOVE_NORMAL, DAMAGE_CONTINUATION);

const PLAYER_CLASS_HUNTER_FEMALE		= new LostarkWork(511, '헌터(여)', CLASS_TYPE_NONE);

const PLAYER_CLASS_DEVIL_HUNTER_FEMALE	= new LostarkWork(512, '건슬링어', CLASS_TYPE_RANGED_DEALER, 2, 0.9, 650, CONTROL_HARD, MOVE_HIGH, DAMAGE_ONCE);

const PLAYER_CLASS_SPECIALIST			= new LostarkWork(601, '스페셜리스트', CLASS_TYPE_NONE);

//바드와 동일하게 설정함.
//중갑3 적용기준임
const PLAYER_CLASS_ARTIST				= new LostarkWork(602, '도화가', CLASS_TYPE_SUPPORTER, 1.9, 1.8, 0, CONTROL_EASY, MOVE_NORMAL, DAMAGE_CONTINUATION);
const PLAYER_CLASS_WEATHER_ARTIST		= new LostarkWork(603, '기상술사', CLASS_TYPE_RANGED_DEALER);
const PLAYER_CLASS_ALCHEMIST			= new LostarkWork(604, '연금술사', CLASS_TYPE_RANGED_DEALER);

const PLAYER_CLASS_MAX					= new LostarkWork(605, '클래스End', CLASS_TYPE_NONE);

const list = [
	PLAYER_CLASS_BERSERKER,
	PLAYER_CLASS_DESTROYER,
	PLAYER_CLASS_WARLORD,
	PLAYER_CLASS_HOLYKNIGHT,
	PLAYER_CLASS_ARCANA,
	PLAYER_CLASS_SUMMONER,
	PLAYER_CLASS_BARD,
	PLAYER_CLASS_SORCERESS,
	PLAYER_CLASS_BATTLE_MASTER,
	PLAYER_CLASS_INFIGHTER,
	PLAYER_CLASS_FORCE_MASTER,
	PLAYER_CLASS_BATTLE_MASTER_MALE,
	PLAYER_CLASS_LANCE_MASTER,
	PLAYER_CLASS_BLADE,
	PLAYER_CLASS_DEMONIC,
	PLAYER_CLASS_REAPER,
	PLAYER_CLASS_HAWK_EYE,
	PLAYER_CLASS_DEVIL_HUNTER,
	PLAYER_CLASS_BLASTER,
	PLAYER_CLASS_SCOUTER,
	PLAYER_CLASS_DEVIL_HUNTER_FEMALE,
	PLAYER_CLASS_ARTIST//,
	//PLAYER_CLASS_WEATHER_ARTIST//,
	//PLAYER_CLASS_ALCHEMIST
];

//인식 순위에 따른 정렬
list.sort(function(a, b) {
	return a.recognize - b.recognize;
});

//인식 순위 값 배정
let rank = 0;
for(const element of list) {
	element.setRecognizeRank(++rank);
}

//Export
export default {
	LostarkWork,
	CLASS_TYPE_SUPPORTER,
	CLASS_TYPE_MELEE_DEALER,
	CLASS_TYPE_RANGED_DEALER,
	CLASS_TYPE_MIXED_DEALER,
	DAMAGE_ONCE,
	DAMAGE_CONTINUATION,
	DAMAGE_BOTH,
	CONTROL_VERYEASY,
	CONTROL_EASY,
	CONTROL_NORMAL,
	CONTROL_HARD,	
	CONTROL_MAXIMUM,
	CONTROL_EXTRA,
	MOVE_LOW,
	MOVE_NORMAL,
	MOVE_HIGH,
	list,
	PLAYER_CLASS_WARRIOR,
	PLAYER_CLASS_MAGICIAN,
	PLAYER_CLASS_FIGHTER,
	PLAYER_CLASS_FIGHTER_MALE,
	PLAYER_CLASS_DELAIN,
	PLAYER_CLASS_HUNTER,
	PLAYER_CLASS_HUNTER_FEMALE,
	PLAYER_CLASS_SPECIALIST,
	PLAYER_CLASS_MAX
};