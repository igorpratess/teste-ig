<template>
  <section>

    <div class="card">
      <div class="p-2">
        <h2>Contratante</h2>
        <div class="d-flex">
          <div class="col-6">
            <h6 class="sub">Contratante</h6>
            <h5 class="info" v-if="user.client">{{user.client.name}}</h5>
          </div>
          <div class="col-6">
            <h6 class="sub">Documento(CPF)</h6>
            <h5 class="info">{{cpf}}</h5>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-6">
            <h6 class="sub">Endereço</h6>
            <h5 class="info" v-if="user.client">{{user.client.address.street}}, {{user.client.address.number}}</h5>
          </div>
          <div class="col-6">
            <h6 class="sub">Bairro</h6>
            <h5 class="info" v-if="user.client">{{user.client.address.neighborhood}}</h5>
          </div>
        </div>
      </div>
      <hr>
      <div class="p-2">
        <h2>Curso</h2>
        <div class="d-flex">
          <div class="col-6">
            <h6 class="sub">Curso sendo contratado</h6>
            <h5 class="info">{{course}}</h5>
          </div>
          <div class="col-6">
            <h6 class="sub">Dia e horário</h6>
            <h5 class="info">{{date}}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-2">
      <div class="p-2">
        <h2>Plano Financeiro</h2>
        <div class="d-flex">
          <div class="col-3">
            <h6 class="sub">Valor das parcelas</h6>
            <h5 class="info">{{valueInstallment}}</h5>
          </div>
          <div class="col-3">
            <h6 class="sub">Quantidade de parcelas</h6>
            <h5 class="info" v-if="user.financial">{{user.financial.installments.quantity}}</h5>
          </div>
          <div class="col-3">
            <h6 class="sub">Forma de pagamento</h6>
            <h5 class="info" v-if="user.financial">{{user.financial.payment_method}}</h5>
          </div>
          <div class="col-3">
            <h6 class="sub">Início da cobrança</h6>
            <h5 class="info" >{{billingAt}}</h5>
          </div>
        </div>
      </div>
      <hr>
      <div class="p-2">
        <h2>Pagamento</h2>
        <div class="d-flex">
          <div class="col-6">
            <form action="http://localhost:8080/" method="POST" data-mundicheckout-form class="form">
              <label for="card-name" class="sub">Nome no cartão</label>
              <input id="card-name" type="text" name="holder-name" data-mundicheckout-input="holder_name" v-on:input="valueFields.cardName = $event.target.value" data-card-field>
              <label for="card-number" class="sub">Número do cartão</label>
              <input id="card-number" type="text" name="card-number" data-mundicheckout-input="number" v-on:input="valueFields.cardNumber = $event.target.value" data-card-field maxlength="16">
              <span  data-mundicheckout-input="brand"></span>
              <div class="d-flex align-center">
                <div class="d-flex flex-column col-4 pr-1">
                  <label for="card-month" class="sub">Mês de expiração</label>
                  <select name="card-month" id="card-month" data-mundicheckout-input="exp_month" v-on:change="valueFields.cardMonth = $event.target.value" data-card-field>
                    <option value=''></option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div class="d-flex flex-column col-4 pr-1">
                  <label for="card-year" class="sub">Ano de expiração</label>
                  <select name="card-year" id="card-year" data-mundicheckout-input="exp_year" v-on:change="valueFields.cardYear = $event.target.value" data-card-field>
                    <option value=''></option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                  </select>
                </div>
                <div class="d-flex flex-column col-4">
                  <label for="card-cvv" class="sub">CVV</label>
                  <input id="card-cvv" type="text" name="card-cvv" data-mundicheckout-input="cvv" v-on:input="valueFields.cardCvv = $event.target.value" data-card-field>
                </div>
              </div>
              <!-- <input type="text" name="buyer-name"> -->
            </form>
          </div>
          <div class="col-6">
            <PayCard :value-fields="valueFields" :input-fields="inputFields"/>
          </div>
        </div>
        <button type="submit">Realizar Pagamento</button>
      </div>
    </div>

  </section>
</template>

<script>
import api from '../services/api'
import PayCard from './PayCard.vue'

export default {
  name: 'Card',
  components: {
    PayCard
  },
  props: {
    msg: String
  },
  data () {
    return {
      user: {},
      cpf: '',
      course: '',
      date: '',
      billingAt: '',
      valueInstallment: '',
      valueFields: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: ''
      },
      inputFields: {
        cardNumber: 'card-number',
        cardName: 'card-name',
        cardMonth: 'card-month',
        cardYear: 'card-year',
        cardCvv: 'card-cvv'
      }
    }
  },
  methods: {
    getUser: async function () {
      const response = await api.get('/frontend-challenge?api_key=frontend_MfZh8hC0SkC90LdsCtGDnDamEkhWPeBp')
      return response
    },
    setUser: async function () {
      await this.getUser()
        .then(res => {
          this.user = res.data
          return res
        })
        .catch(err => console.log(err))
      this.transformCpf()
      this.transformCourse()
      this.transformDate()
      this.transformBillingAt()
      this.transformValueInstallments()
    },
    transformCpf: function () {
      const array = []

      for (let i = 0; i < this.user.client.document_cpf.length; i++) {
        if (i === 3 || i === 6) {
          array.push('.')
        } else if (i === 9) {
          array.push('-')
        }
        if (i > 2 && i < 9) {
          array.push('#')
        } else {
          array.push(this.user.client.document_cpf[i])
        }
      }

      this.cpf = array.join('')
    },
    transformCourse: function () {
      this.course = this.user.course.name.split(' ')[0] + ' ' + this.user.course.name.split(' ')[1]
    },
    transformDate: function () {
      const date = new Date(this.user.course.start_at)
      const weekday = date.getDay()

      switch (weekday) {
        case 1:
          this.date = 'Segunda-feira, ' + this.user.course.start_at.split(' ')[1].split(':')[0] + ':' + this.user.course.start_at.split(' ')[1].split(':')[1]
          break
        case 2:
          this.date = 'Terça-feira, ' + this.user.course.start_at.split(' ')[1].split(':')[0] + ':' + this.user.course.start_at.split(' ')[1].split(':')[1]
          break
        case 3:
          this.date = 'Quarta-feira, ' + this.user.course.start_at.split(' ')[1].split(':')[0] + ':' + this.user.course.start_at.split(' ')[1].split(':')[1]
          break
        case 4:
          this.date = 'Quinta-feira, ' + this.user.course.start_at.split(' ')[1].split(':')[0] + ':' + this.user.course.start_at.split(' ')[1].split(':')[1]
          break
        case 5:
          this.date = 'Sexta-feira, ' + this.user.course.start_at.split(' ')[1].split(':')[0] + ':' + this.user.course.start_at.split(' ')[1].split(':')[1]
          break
        case 6:
          this.date = 'Sábado, ' + this.user.course.start_at.split(' ')[1].split(':')[0] + ':' + this.user.course.start_at.split(' ')[1].split(':')[1]
          break
        case 7:
          this.date = 'Domingo, ' + this.user.course.start_at.split(' ')[1].split(':')[0] + ':' + this.user.course.start_at.split(' ')[1].split(':')[1]
          break
        default:
          this.date = 'Não agendado ainda.'
      }
    },
    transformBillingAt: function () {
      const billingAt = new Date(this.user.financial.start_billing_at)
      this.billingAt = billingAt.toLocaleDateString('pt-BR')
    },
    transformValueInstallments: function () {
      this.valueInstallment = this.user.financial.installments.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    }
  },
  mounted () {
    this.setUser()
  }
}
</script>

<style lang="css" scoped>
  @import '../styles/card.css';
</style>
