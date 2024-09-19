import Grid from "./components/Grid";

const students = [
  { id: "1", name: "Ola Normann" },
  { id: "2", name: "Kari Normann" },
];

function App() {
  return <div>
    
    <Grid students={students}/>

  </div> 

}

export default App;