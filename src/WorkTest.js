import { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import EFGame from './lostark/EFGame';
import WorkTestQuestions from './lostark/WorkTestQuestions';

function getQuestion(id) {
	return WorkTestQuestions.getQuestion(id);
}

function MainAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div">
						LOSTARK 직업 추천기
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

function StepMessage(props) {
	let q = props.question;
	let title = q.title;
	let btn1 = q.sel1 ? q.sel1.title : '';
	let btn2 = q.sel2 ? q.sel2.title : '';
	let btn3 = q.sel3 ? q.sel3.title : '';
	let btn4 = q.sel4 ? q.sel4.title : '';
	return (
		<Card sx={{display: 'inline-block', width: 'max(300px, 50vw)', height: 'min(500px, 50vh)', marginTop: '30px'}}>
			<Box sx={{ width: '100%' }}>
				<LinearProgress variant="determinate" value={props.progress / props.max * 100} />
			</Box>
			<div style={{padding: '8px'}}>
				<Typography sx={{marginTop: '16px', marginBottom: '16px'}} variant='h5'>{title}</Typography>
				{btn1 && (<div><Button sx={{marginTop: '8px', width: 'min(90%, 350px)'}} onClick={() => props.btnClick(1)} variant="contained" color="error">{btn1}</Button><br/></div>)}
				{btn2 && (<div><Button sx={{marginTop: '8px', width: 'min(90%, 350px)'}} onClick={() => props.btnClick(2)} variant="contained" color="success">{btn2}</Button><br/></div>)}
				{btn3 && (<div><Button sx={{marginTop: '8px', width: 'min(90%, 350px)'}} onClick={() => props.btnClick(3)} variant="contained">{btn3}</Button><br/></div>)}
				{btn4 && (<div><Button sx={{marginTop: '8px', width: 'min(90%, 350px)'}} onClick={() => props.btnClick(4)} variant="contained" color="secondary">{btn4}</Button><br/></div>)}
			</div>
		</Card>
	);
}

export default function WorkTest(props) {
	const condition = useRef();
	const [step, setStep] = useState(0);
	const [progress, setProgress] = useState(0);
	const [maxProgress, setMaxProgress] = useState(0);
	
	const btnClick = function(kind) {
		let question = getQuestion(step);
		try {
			switch(kind) {
				case 1:
					checkCondition(question.sel1.condition);
					break;
				case 2:
					checkCondition(question.sel2.condition);
					break;
				case 3:
					checkCondition(question.sel3.condition);
					break;
				case 4:
					checkCondition(question.sel4.condition);
					break;
			}
		} catch(e) {
			
		}

		setProgress(maxProgress - condition.current.length);

		if (condition.current.length <= 1)	{
			setStep(WorkTestQuestions.getQuestionCount());
		} else {
			setStep(step + 1);
		}
	}

	function checkCondition(condi) {
		let arr = new Array();
		for(const element of condition.current) {
			console.log("조건체크 : " + element.name + ", 여부 : " + condi(element));
			if (condi(element))
				arr.push(element);
		}

		condition.current = arr;
		console.log(arr);
	}

	function isEnd() {
		return step >= WorkTestQuestions.getQuestionCount();
	}

	useEffect(() => {
		reset();
	}, []);

	function reset() {
		condition.current = new Array();
		for(const element of EFGame.EFConst.PlayerClass.list) {
			condition.current.push(element);
		}
		setProgress(0);
		setMaxProgress(EFGame.EFConst.PlayerClass.list.length);
		setStep(0);
	}

	return (
		<main>
			<MainAppBar/>
			<div style={{textAlign: 'center'}}>
				{!isEnd() && (<StepMessage
					question={getQuestion(step)}
					btnClick={btnClick}
					progress={progress}
					max={maxProgress}
				/>)}
				{isEnd() && (
					<Card sx={{display: 'inline-block', width: 'max(300px, 50vw)', height: '100%', marginTop: '30px', paddingBottom: '16px'}}>
						{condition.current.length >= 1 && (
							<div>
								<Typography sx={{marginTop: '16px', marginBottom: '16px'}} variant='h5'>당신에게 알맞는 직업은?</Typography>
								<div>
									{condition.current.map((e) => {
										return (
											<div>
												<CardMedia height="140" image={`./work/${e.id}.png`} component="img"/>
												<Typography>{e.name}</Typography>
											</div>
										);
									})}
									<Button variant="contained" onClick={reset}>다시 시도하기</Button>
								</div>
							</div>
						)}
						{condition.current.length < 1 && (
							<div>
								<Typography>해당하는 직업이 없어요 ㅠㅠㅠ 미안해요 ㅠㅠㅠ</Typography>
								<Button variant="contained" onClick={reset}>다시 시도하기</Button>
							</div>
						)}
					</Card>
				)}
			</div>
		</main>
	);
}