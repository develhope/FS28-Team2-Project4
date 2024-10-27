import Swal from 'sweetalert2';

export const SaveConfirm = () => {
  return Swal.fire({
    title: 'Sei sicuro?',
    text: 'Vuoi procedere con il salvataggio?',
    icon: 'warning',
    showCancelButton: true,
    background: '#01282F',
    color: '#fff',
    confirmButtonColor: 'green',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sì, salva!',
  });
};
