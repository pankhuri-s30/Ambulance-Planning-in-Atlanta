import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Filters() {
    console.log('Inside button');
  return (
    <>
    <div >
    <InputGroup>
    <InputGroup.Text id="basic-addon1">Regions</InputGroup.Text>
    <select class="form-select" aria-label="Default select example">
        <option selected>Fulton</option>
        <option value="1">Gwinnett</option>
        <option value="2">Henry</option>
        <option value="3">Rockdale</option>
        <option value="1">Fayette</option>
    </select>
    </InputGroup>
      <br />
    <InputGroup>
    <InputGroup.Text id="basic-addon1">Time of Day</InputGroup.Text>
    <select class="form-select">
        <option selected>12 to 1</option>
        <option value="1">1 to 2</option>
        <option value="2">2 to 3</option>
        <option value="3">3 to 4</option>
        <option selected>4 to 5</option>
    </select>
    <select class="form-select">
        <option selected>AM</option>
        <option value="1">PM</option>
    </select>
    </InputGroup>
      <br />
    <InputGroup>
        <InputGroup.Text id="basic-addon1">Number of Ambulances</InputGroup.Text>
        <Form.Control
          placeholder="20"
          aria-label="20"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

    </div>
    <br />
    <Button as="input" type="submit" value="Simulate" />
    </>
  );
}
export default Filters;