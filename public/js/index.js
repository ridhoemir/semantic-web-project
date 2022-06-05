function searchToggle(obj, evt) {
  const container = $(obj).closest('.search-wrapper');
  if (!container.hasClass('active')) {
    container.addClass('active');
    evt.preventDefault();
  } else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
    container.removeClass('active');
    container.find('.search-input').val('');
  }
}

$(document).on('click', '#detailData', function (event) {
  event.preventDefault();
  let id = $(this).attr('data-id');
  id = id.includes('#') ? id.slice(id.indexOf('#')).replace('#', '') : '';
  $.get(`/creators/${id}`, (data) => {
    $('div#detailModal').modal('show');
    $('#imgDetail').attr('src', data[0].img_url);
    $('#imgDetail').attr('alt', data[0].nama);
    $('#modalTitle').text(data[0].nama);
    $('#modalNama').text(data[0].nama);
    $('#modalTglLahir').text(data[0].tanggal_lahir);
    $('#modalTglWafat').text(data[0].tanggal_wafat);
    $('#modalDaerah').text(data[0].daerah_asal);
    $('#modalNamaLukisan').text(data[0].list_lukisan);
  });
});

$(document).on('click', '#detailDataPainting', function (event) {
  event.preventDefault();
  let id = $(this).attr('data-id');
  id = id.includes('#') ? id.slice(id.indexOf('#')).replace('#', '') : '';
  $.get(`/painting/${id}`, (data) => {
    $('div#detailModal').modal('show');
    $('#imgDetail').attr('src', data[0].img_url);
    $('#imgDetail').attr('alt', data[0].nama);
    $('#modalTitle').text(data[0].nama);
    $('#modalNama').text(data[0].nama);
    $('#modalThnPembuatan').text(data[0].tahun_pembuatan);
    $('#modalNamaPencipta').text(data[0].nama_pencipta);
    if (data[0].makna ) {
      $('#modalMakna').text(data[0].makna);
    } else {
      $('#modalMakna').text('-');
    }
  });
});
