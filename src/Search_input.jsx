function SearcInput(){
    return(
        <div className="container">
        <div className="row">
          <div className="col heading mt-5">
            <p className="text-center mt-4 fs-1">
              Hello Tamara. What are we going to success today?
            </p>
            <div className="input-group mb-3 mt-4">
              <input
                type="text"
                className="form-control submit-input new-task-input"
                placeholder="Great job! Next one?"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-success add-task-btn"
                type="button"
                id="button-addon2"
              >
                +Add
              </button>
            </div>
          </div>
        </div>
        </div>

     
    )
}

export default SearcInput