
export default {
  data () {
    return {
      config: {
        title: 'Listagem dos eventos',
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 2,
        refresh: true,
        bodyStyle: {
          maxHeight: '500px'
        },
        selection: 'single',
        rowHeight: '60px',
        responsive: true,
        pagination: {
          rowsPerPage: 5,
          options: [5, 10, 15, 30, 50, 500]
        },
        messages: {
          noData: '<i class="material-icons">error_outline</i> Nenhum registro para exibir.',
          noDataAfterFiltering: '<i class="material-icons">error_outline</i> Nenhum resultado. Refine os termos da busca.'
        },
        labels: {
          columns: 'Colunas',
          search: 'Pesquisar evento...',
          allCols: 'Todas as colunas',
          clear: 'limpar',
          all: 'Todos',
          rows: 'Registros por página',
          selected: {
            singular: 'item selecionado.',
            width: '10px'
          }
        }
      },
      columns: [
        {
          label: 'Nome do evento',
          field: 'name',
          type: 'string',
          width: '80px',
          sort: true,
          filter: true
        },
        {
          label: 'Início',
          field: 'startDate',
          width: '55px',
          type: 'date',
          sort: true,
          filter: true
        },
        {
          label: 'Término',
          field: 'endDate',
          type: 'date',
          width: '55px',
          sort: true,
          filter: true
        },
        {
          label: 'Duração',
          field: 'duration',
          width: '40px',
          format (value) {
            return value + ' Horas'
          }
        },
        {
          label: 'Situação',
          field: 'sta',
          filter: true,
          type: 'number',
          width: '50px'
        },
        {
          label: 'Ações',
          field: 'actions',
          width: '30px'
        }
      ]
    }
  }
}
