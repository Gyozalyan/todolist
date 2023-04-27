import DatePicker from "react-datepicker";
import styles from "./filters.module.css";
import { memo, useState } from "react";
import { Accordion, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/helpers";
import { PropTypes } from "prop-types";


function SearchAndFilter({ searchFilteredTasks, getInitialTasks }) {
  
  const initialDates = {
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  }

  const initialSort={
    status: "", sort: ""
  }


  const [selectedDate, setSelectedDate] = useState(initialDates);
  const [statusSort, setStatusSort] = useState(initialSort);
  const [search, setSearch] = useState('');



  const optionsSort = [
    { name: "None", value: "" },
    { name: "A-Z", value: "a-z" },
    { name: "Z-A", value: "z-a" },
    { name: "Creation date oldest", value: "creation_date_oldest" },
    { name: "Creation date newest", value: "creation_date_newest" },
    { name: "Deadline date oldest", value: "completion_date_oldest" },
    { name: "Deadline date newest", value: "completion_date_newest" },
  ];

  const optionsStatus = [
    { name: "None", value: "" },
    { name: "Active", value: "active" },
    { name: "Done", value: "done" },
  ];

  const optionsDate = [
    { name: "Created after", value: "create_gte" },
    { name: "Created before", value: "create_lte" },
    { name: "Deadline after", value: "complete_gte" },
    { name: "Deadline before", value: "complete_lte" },
  ];

  const changeDate = (key, date) => {
    setSelectedDate({ ...selectedDate, [key]: formatDate(date) });
  };

  const resetFilters = () => {
    setSearch('')
    setSelectedDate(initialDates)
    setStatusSort(initialSort)
    getInitialTasks ({
         search:'',
      ...initialDates,
      ...initialSort
    })

  };

  const searchTask=()=>{
    const filters = {
      search:search,
      ...selectedDate,
      ...statusSort
    }

    searchFilteredTasks(filters)
  }

  const handleEventEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();      
      searchTask();
    }
  };

  

  return (
    <Accordion className="mb-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Form
            className={styles.accordion}
            onClick={(parent) => parent.stopPropagation()}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleEventEnter}
            />
            <span
              className="btn btn-outline-success me-2"
              title="Apply search"
              onClick={searchTask}
            >
              <FontAwesomeIcon icon={faSearch} />
            </span>

            <span className="btn btn-outline-info" title="Reset filters" onClick = {resetFilters}>
              <FontAwesomeIcon icon={faRefresh} />
            </span>
          </Form>
        </Accordion.Header>
        <Accordion.Body>
          <Container fluid={true}>
            <Row>
              {optionsDate.map((option) => {
                const dateValue = selectedDate[option.value];

                return (
                  <Col
                    sm={6}
                    md={4}
                    lg={3}
                    className="text-center"
                    key={option.name}
                  >
                    <fieldset className={styles.filterItem}>
                      <legend>{option.name}</legend>
                      <DatePicker
                        showIcon
                        selected={dateValue ? new Date(dateValue) : ""}
                        onChange={(date) => {
                          changeDate(option.value, date);
                        }}
                       
                      />
                    </fieldset>
                  </Col>
                );
              })}
            </Row>

            <Row>
              <Col sm={6} className="text-center">
                <fieldset>
                  <legend>Status</legend>
                  <Form.Select
                    aria-label="Status"
                    value={statusSort.status}
                    onChange={(event) => {
                      setStatusSort({
                        ...statusSort,
                        status: event.target.value,
                      });
                    }}
                  >
                    {optionsStatus.map((option) => {
                      return (
                        <option key={option.name} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </fieldset>
              </Col>
              <Col sm={6} className="text-center">
                <fieldset>
                  <legend>Sort</legend>
                  <Form.Select
                    aria-label="Status"
                    value={statusSort.sort}
                    onChange={(event) => {
                      setStatusSort({
                        ...statusSort,
                        sort: event.target.value,
                      });
                    }}
                  >
                    {optionsSort.map((option) => {
                      return (
                        <option key={option.name} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </fieldset>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}


SearchAndFilter.propTypes = {
  searchFilteredTasks: PropTypes.func.isRequired,
  getInitialTasks: PropTypes.func.isRequired,
 
};
export default memo(SearchAndFilter);
