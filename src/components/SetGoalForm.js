import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import images from "../assets/images/index.js";
import axios from 'axios';
import App from "../App";
import { v4 as uuidv4 } from 'uuid';


import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0.5: 'This drink, I like it. Another!',
    1: 'Dude, you’re embarrassing me in front of the wizards.',
    1.5: 'I get emails from a raccoon, so nothing sounds crazy anymore.',
    2: "Don't worry, she's got help",
    2.5: 'I can do this all day',
    3: "We're fighting an army of robots. And I have a bow and arrow.",
    3.5: 'Puny God',
    4: 'Dormammu, I’ve come to bargain.',
    4.5: 'I am Iron Man',
    5: 'Avengers, assemble!',
};

export function SetGoalForm(props) {
    const [goalFields, setGoalFormFields] = useState({
        title: "",
        due_date: "",
        why: "",
        difficulty: "",
    });

    const [inputFields, setInputFields]  = useState([
            {description: ''},
            ]);
    
    // const [inputFields, setInputFields] = useState([
    //     { id: uuidv4(), taskDescription: '' },
    //           ]);

    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

    const handleSubmitNewGoal = (submitEvent) => {
        submitEvent.preventDefault();

        const newGoal = {
            title: goalFields.title,
            due_date: goalFields.due_date,
            why: goalFields.why,
            difficulty: goalFields.difficulty,
            tasks: [...inputFields]
        };

        props.addNewGoal(newGoal);
        console.log(newGoal);
        console.log(inputFields);
        console.log(goalFields.difficulty);
        setGoalFormFields({
            title: "",
            due_date: "",
            why: "",
            difficulty: "",
        })
        setInputFields([{
            description: ""
        }]);
    };

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
        }

    // const handleChangeInput = (id, event) => {
    //     const newInputFields = inputFields.map(i => {
    //       if(id === i.id) {
    //         i[event.target.name] = event.target.value
    //       }
    //       return i;
    //     })
        
    //     setInputFields(newInputFields);
    //   }
    const handleAddFields = () => {
        setInputFields([...inputFields, {description: ''}])
    }  
    // const handleAddFields = () => {
    //     setInputFields([...inputFields, { id: uuidv4(),  taskDescription: ''}])
    // }
    
    const handleRemoveFields = id => {
            const values  = [...inputFields];
            values.splice(values.findIndex(value => value.id === id), 1);
            setInputFields(values);
    }


    const useStyles = makeStyles((theme) => ({
            root: {
                '& .MuiTextField-root': {
                margin: theme.spacing(1),
                },
                },
            button: {
                margin: theme.spacing(1),
            }
            }))
        
    const classes = useStyles();

    return (
        <Container>
        <form className={classes.root} onSubmit={handleSubmitNewGoal}>
        <h2>Let's get started by setting your plan(t) goals!</h2>
        <br></br>
            <TextField
                name="title"
                label="Enter a goal title"
                type='text'
                value={goalFields.title}
                onChange={(event) => setGoalFormFields({...goalFields, title: event.target.value})}
                variant="outlined"
                fullWidth
            />
        <br></br>
        <label>Deadline</label>
        <br></br>
            <input type="date" name="deadline" placeholder="Enter a deadline"
            value={goalFields.due_date}
            onChange={(event) => setGoalFormFields({...goalFields, due_date: event.target.value})}
            />
        <br></br>
        <br></br>
        <label>Difficulty </label>
        <br></br>
        <Box
        sx={{
        width: 600,
        display: 'flex',
        alignItems: 'center',
        }}
        >
        <Rating
        name="difficulty"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
            setValue(newValue);
            setGoalFormFields({...goalFields, difficulty: newValue});
        }}
        onChangeActive={(event, newHover) => {
            setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
        />
        {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
        </Box>
        <br></br>
        <br></br>
        <label>Goal Description - why do you want to accomplish this?</label>
            <TextField
                name = "why"
                label="Enter a goal description"
                type='text'
                value={goalFields.why}
                onChange={(event) => setGoalFormFields({...goalFields, why: event.target.value})}
                variant="outlined"
                fullWidth
            />
        <br></br>
        <br></br>
        <label>Subtasks</label>
        <br></br>
        <h3>Add Subtasks</h3>
            {inputFields.map((inputField, index) => (
                <div key={index}>
                <TextField
                    name="description"
                    label="description"
                    type='text'
                    value={inputField.description}
                    variant="outlined"
                    onChange={event => handleChangeInput(index, event)}
                    // onChange={event => handleChangeInput(inputField.id, event)}
                    />
                <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                <RemoveIcon />
                </IconButton>
                <IconButton
                onClick={handleAddFields}
                >
                <AddIcon />
                </IconButton>
                </div>
            ))}
        <br></br>
        <h3>Here is what your plant can look like as you complete your tasks!</h3>
        <img src={images.gif.path} alt={images.gif.alt} />
        <br></br>
        <Button
        className={classes.button}
        variant="contained" 
        color="primary" 
        type="submit" 
        endIcon={<Icon>send</Icon>}
        onClick={handleSubmitNewGoal}
        >Send to Nursery</Button>
        </form>
        </Container>
    )
}