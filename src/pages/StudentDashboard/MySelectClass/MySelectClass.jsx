import Swal from 'sweetalert2';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import SelectClassRow from '../../../components/SelectClassRow/SelectClassRow';
import useSelectClass from '../../../hooks/useSelectClass';

const MySelectClass = () => {
  const [selectClass, refetch] = useSelectClass();

  // hander delete the selected class
  const handlerDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/selectedClasses/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your class has been deleted.',
                icon: 'success',
              });
            }
          });
      }
    });
  };
  return (
    <Container>
      <Heading heading="My Selected Class"></Heading>
      <div className="my-12">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Delete</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {selectClass &&
                selectClass.length > 0 &&
                selectClass.map((item, i) => (
                  <SelectClassRow
                    handlerDelete={handlerDelete}
                    i={i}
                    key={item._id}
                    item={item}
                  ></SelectClassRow>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default MySelectClass;
