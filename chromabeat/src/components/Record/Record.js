import "./Record.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid";

export default function Record() {
  return (
    <div className="Record">
      <div id="box">
        <div id="shadow">
          <div id="vinyl">
            <div id="inner">
              <div id="label">
                <div id="hole"></div>
                <span id="title">Rum Runner Sound System</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="controls">
        <button id="play">
          <FontAwesomeIcon icon="coffee" />
        </button>
        <button id="stop">
          <FontAwesomeIcon icon="fas fa-stop"></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
