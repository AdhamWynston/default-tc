import {CPF, CNPJ} from 'cpf_cnpj'
export default {
  data () {
    return {
      config: {
        title: 'Listagem dos Clientes',
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 2,
        refresh: true,
        bodyStyle: {
          maxHeight: '500px'
        },
        selection: 'single',
        rowHeight: '40px',
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
          search: 'Pesquisar cliente...',
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
          label: 'Nome',
          field: 'name',
          type: 'string',
          width: '90px',
          sort: true,
          filter: true
        },
        {
          label: 'Nº Documento',
          field: 'document',
          width: '50px',
          sort: false,
          filter: true,
          format (value) {
            value = CPF.strip(value)
            if (value.length === 11) {
              return CPF.format(value)
            }
            return CNPJ.format(value)
          }
        },
        {
          label: 'Telefone',
          field: 'phone',
          width: '50px',
          sort: false,
          filter: true
        },
        {
          label: 'Status',
          field: 'status',
          filter: true,
          format (value) {
            if (value === 1) {
              return '<i class="material-icons text-positive">check_circle</i> Ativado'
            }
            return '<i class="material-icons text-negative">block</i> Desativado'
          },
          width: '40px'
        },
        {
          label: 'Cadastrado em',
          field: 'created_at',
          type: 'date',
          width: '50px',
          sort: true,
          filter: true
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500
    }
  }
}
