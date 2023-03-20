import Appcard from "./appCard";

export default function DashBoard() {
  const data = [
    {
      title: 'File Comparison Tool',
      subTitle: 'XLSX Comparison Utility Tool',
      description: 'XLSX comparison utility to findout the differences.',
    }
  ];

  return (

    <div id="grid-container">

      {data.map(function (object, i) {
        return <div key={i}><Appcard data={object}  /></div>;
      })}
    </div>
  );
}
