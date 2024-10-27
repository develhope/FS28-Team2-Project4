import Swal from 'sweetalert2';

export const SaveSuccess = () => {
  Swal.fire({
    title: 'Successo!',
    text: 'Il salvataggio è avvenuto con successo.',
    icon: 'success',
    background: '#01282F',
    color: '#fff',
    confirmButtonText: 'Ok',
    confirmButtonColor: 'green'
  });
};
