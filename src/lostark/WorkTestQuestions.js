import EFGame from './EFGame';

const questionList = [
	{
		title: 'Q. 보석 2개만 껴도 괜찮을까?',
		sel1: {
			title: '날먹이 답이지',
			condition: function(work) {
				return work.id == 505 || work.id == 403;
			}
		},
		sel2: {
			title: '숨지마라!! 유산스카 !!!',
			condition: function(work) {
				return work.id != 505;
			}
		},
		sel3: {
			title: '合 久丨 卟 讣!! 只 山 亼 刁卜 !!!',
			condition: function(work) {
				return work.id != 505;
			}
		},
		sel4: {
			title: '그게뭐임?',
			condition: function(work) {
				return true;
			}
		}
	},
	{
		title: 'Q. 나는 남캐/여캐가 좋다',
		sel1: {
			title: '남캐',
			condition: function(work) {
				return work.male;
			}
		},
		sel2: {
			title: '여캐',
			condition: function(work) {
				return work.female;
			}
		},
		sel3: {
			title: '상관없어',
			condition: function(work) {
				return true;
			}
		}
	},
	{
		title: 'Q. 나는 나이가 어린 캐릭터가 좋다.',
		sel1: {
			title: 'ㅇㅇ',
			condition: function(work) {
				return work.children;
			}
		},
		sel2: {
			title: '로리/쇼타 ㄲㅈ',
			condition: function(work) {
				return !work.children;
			}
		},
		sel3: {
			title: '상관없어',
			condition: function(work) {
				return true;
			}
		}
	},
	{
		title: 'Q. 원딜을 할까? 근딜을 할까?',
		sel1: {
			title: '난 원딜!',
			condition: function(work) {
				return work.ranged;
			}
		},
		sel2: {
			title: '난 근딜!',
			condition: function(work) {
				return work.melee;
			}
		},
		sel3: {
			title: '난 서폿이다옹',
			condition: function(work) {
				return work.supporter;
			}
		},
		sel4: {
			title: '상관없어!',
			condition: function(work) {
				return true;
			}
		}
	},
	{
		title: 'Q. 나는 이동기 구린 캐릭터가 싫다.',
		sel1: {
			title: '무조건 이동기가 제일 좋아야돼!!',
			condition: function(work) {
				return work.moveskillScore >= EFGame.EFConst.PlayerClass.MOVE_HIGH;
			}
		},
		sel2: {
			title: '느리지만 않으면 될듯?',
			condition: function(work) {
				return work.moveskillScore >= EFGame.EFConst.PlayerClass.MOVE_NORMAL;
			}
		},
		sel3: {
			title: '느려도 괜찮아',
			condition: function(work) {
				return true;
			}
		}
	},
	{
		title: 'Q. 나는 파티 선호도가 높은 직업이 좋다.',
		sel1: {
			title: '아무리 그래도 애정있는 캐릭 키우는게 낫지',
			condition: function(work) {
				return true;
			}
		},
		sel2: {
			title: '그래도 파티 구인은 무난하게 되는게 낫지',
			condition: function(work) {
				return work.recognizeRank <= 18;
			}
		},
		sel3: {
			title: '구인은 빠르게!',
			condition: function(work) {
				return work.recognizeRank <= 10;
			}
		}
	},
	{
		title: 'Q. 캐릭터 방어력은?',
		sel1: {
			title: '무조건 단단한거...',
			condition: function(work) {
				return work.defenceRank >= 4;
			}
		},
		sel2: {
			title: '그래도 조금 단단한게 낫지',
			condition: function(work) {
				return work.defenceRank >= 3;
			}
		},
		sel3: {
			title: '그래도 너무 낮지만 않으면 괜찮아',
			condition: function(work) {
				return work.defenceRank >= 2;
			}
		},
		sel4: {
			title: '상관없어',
			condition: function(work) {
				return true;
			}
		}
	},
	{
		title: 'Q. 너의 실력은 어느정도야?',
		sel1: {
			title: '잘하지',
			condition: function(work) {
				return work.controlScore <= EFGame.EFConst.PlayerClass.CONTROL_EXTRA;
			}
		},
		sel2: {
			title: '흠.. 그럭저럭?',
			condition: function(work) {
				return work.controlScore <= EFGame.EFConst.PlayerClass.CONTROL_NORMAL;
			}
		},
		sel3: {
			title: '좀 못하는데 쉬운것좀..',
			condition: function(work) {
				return work.controlScore <= EFGame.EFConst.PlayerClass.CONTROL_EASY;
			}
		},
		sel3: {
			title: '늙은사람들은 서러워서 어쩌나',
			condition: function(work) {
				return work.controlScore <= EFGame.EFConst.PlayerClass.CONTROL_EASY;
			}
		}
	},
	{
		title: 'Q. 딜러 타입?',
		sel1: {
			title: '난 한방딜 위주!',
			condition: function(work) {
				return work.damageScore == EFGame.EFConst.PlayerClass.DAMAGE_BOTH || work.damageScore == EFGame.EFConst.PlayerClass.DAMAGE_ONCE || work.supporter;
			}
		},
		sel2: {
			title: '딜만쎄면 상관없어!',
			condition: function(work) {
				return true;
			}
		},
	}
];

/*
,
	{
		title: '',
		sel1: {
			title: '',
			condition: function(work) {
				return true;
			}
		},
		sel2: {
			title: '',
			condition: function(work) {
				return true;
			}
		},
		sel3: {
			title: '',
			condition: function(work) {
				return true;
			}
		},
		sel4: {
			title: '',
			condition: function(work) {
				return true;
			}
		}
	}
*/

export function getQuestionCount() {
	return questionList.length;
}

export function getQuestion(id) {
	if (questionList.length <= id || id < 0) 
		return {
			title: '',
			sel1: {
				title: '',
				condition: function(work) {
					return true;
				}
			},
			sel2: {
				title: '',
				condition: function(work) {
					return true;
				}
			},
			sel3: {
				title: '',
				condition: function(work) {
					return true;
				}
			},
			sel4: {
				title: '',
				condition: function(work) {
					return true;
				}
			}
		};
	return questionList[id];
}

export default {
	getQuestion,
	getQuestionCount
}