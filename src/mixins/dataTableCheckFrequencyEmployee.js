import {CPF} from 'cpf_cnpj'
import moment from 'moment'
export default {
  data () {
    return {
      config: {
        title: 'Registrar Frequências',
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: '40px',
        responsive: true,
        messages: {
          noData: '<i class="material-icons">error_outline</i> Nenhum registro para exibir.',
          noDataAfterFiltering: '<i class="material-icons">error_outline</i> Nenhum resultado. Refine os termos da busca.'
        },
        labels: {
          columns: 'Colunas',
          search: 'Pesquisar Funcionário...',
          allCols: 'Todas as colunas'
        }
      },
      columns: [
        {
          label: 'Nome',
          field: 'name',
          type: 'string',
          width: '400px',
          sort: true,
          filter: true
        },
        {
          label: 'Nº Documento',
          field: 'document',
          sort: false,
          width: '200px',
          filter: true,
          format (value) {
            value = CPF.strip(value)
            return CPF.format(value)
          }
        },
        {
          label: 'Entrada',
          field: 'checkin',
          width: '100px'
        },
        {
          label: 'Registrado em',
          field: 'check_in',
          format (value) {
            if (value === null) {
              return ''
            }
            return moment(value).format('DD/MM/YYYY HH:mm:ss')
          }
        },
        {
          label: 'Saída',
          field: 'checkout',
          width: '100px'
        },
        {
          label: 'Registrado em',
          field: 'check_out',
          format (value) {
            if (value === null) {
              return ''
            }
            return moment(value).format('DD/MM/YYYY HH:mm:ss')
          }
        }
      ]
    }
  }
}
