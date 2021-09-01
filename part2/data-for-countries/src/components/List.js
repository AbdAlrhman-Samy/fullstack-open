const List = ({ results }) => {
  return (
    <div>
      <h1>Results:</h1>
      <ul>
        {results.map((result) => {
          return <li key={result.numericCode}>{result.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default List;
