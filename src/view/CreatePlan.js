import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
// function WorkoutForm(props) {
//   const workout = props.workout;

//   return (
//     <Form>
//       <Form.Group controlId="PlanInfo">
//         <Form.Label>{workout}</Form.Label>
//       </Form.Group>
//     </Form>
//   );
// }
function WorkoutForm(props) {
  const workout = props.workout;

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="workout Date">
              <Form.Label>Workout Date</Form.Label>
              <Form.Control type="workout Date" placeholder="Workout Date" />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Group controlId="workout Title">
              <Form.Label>Workout Title</Form.Label>
              <Form.Control type="workout Title" placeholder="Workout Title" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

function WorkoutFormDate(props) {
  const Date = props.date;

  return (
    <Form>
      <Form.Group controlId="PlanInfo">
        <Form.Label>Test</Form.Label>
      </Form.Group>
    </Form>
  );
}

export default function CreatePlan() {
  const [planStatus, setPlanStatus] = useState(false);
  const [planTrainee, setPlanTrainee] = useState('');
  const [planWorkoutList, setPlanWorkoutList] = useState();


  const [planInputFieldList, setPlanInputFieldList] = useState([]);

  const [workoutStatus, setWorkoutStatus] = useState(false);
  const [workoutDate, setWorkoutDate] = useState('');
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutComments, setWorkoutComments] = useState('');
  const [workoutExerciseList, setWorkoutExerciseList] = useState([]);

  const completePlan = () => setPlanStatus(true);
  const completeWorkout = () => setWorkoutStatus(true);
  const addPlanWorkoutList = () => setPlanWorkoutList(planWorkoutList.push( 
    {Date: workoutDate, Title:workoutTitle, Exercises: workoutExerciseList}
  ))

  const handlePlanCreation = () => {
    // createPlan({});
  }


  function addWorkoutForm() {
    setPlanInputFieldList([...planInputFieldList,0]);
  }

  const formList = planInputFieldList.map((workout, index) => (
    <Card key={index}>
      <Card.Header>
        <WorkoutForm/>
        {/* <WorkoutForm workout={workout} /> */}
        {/* <WorkoutFormDate/> */}
      </Card.Header>
    </Card>
    
  ));
  
  return (
  <>
      <h1> Plan1 </h1>
      <Form>
          <Form.Group controlId="PlanInfo">
            <Form.Label>Trainee</Form.Label>
            <Form.Control
              type="trainee"
              value={planTrainee}
              onChange={event => setPlanTrainee(event.target.value)}
              placeholder="Trainee Name"
            />
          </Form.Group>
      </Form>
      <Accordion>
      {
      formList
      }
      
      </Accordion>
      
      <Button variant="primary" onClick={addWorkoutForm}>Add Workout</Button>



      <Button variant="primary" onClick={handlePlanCreation}>Submit Plan</Button>
  </>
  )
}
