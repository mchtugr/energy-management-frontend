<template>
  <div class="dashboard">
    <b-row>
      <!-- Vertical Nav -->
      <b-col cols="2">
        <vertical-nav />
      </b-col>
      <!-- Dashboard -->
      <b-col cols="10">
        <b-table hover :items="factoryList" :fields="fields" ref="table">
          <!-- Actions Column -->
          <template v-slot:cell(edit)="{ item }">
            <b-btn variant="success" @click="showEditModal(item)"
              ><b-icon icon="pencil-square"></b-icon
            ></b-btn>
          </template>
          <template #cell(remove)="{ item }">
            <b-btn variant="danger" @click="showRemoveModal(item)"
              ><b-icon icon="x-square" class="bg-danger"></b-icon
            ></b-btn>
          </template>
        </b-table>
        <b-btn class="bg-success my-3" @click="showCreateModal"
          >Create New Factory</b-btn
        >
      </b-col>
    </b-row>

    <!-- EDIT MODAL -->
    <delete-modal id="delete-modal" :form="form" target="factory" />
    <input-modal :type="modal.type" id="input-modal" :form="form" />
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import filters from '../mixins/filters'
import InputModal from '../components/input-modal/InputModal.vue'
import DeleteModal from '../components/delete-modal/DeleteModal.vue'
import VerticalNav from '../components/vertical-nav/VerticalNav.vue'
export default {
  components: { InputModal, DeleteModal, VerticalNav },
  name: 'FactoryDetails',
  data() {
    return {
      modal: {
        type: 'edit',
      },
      form: {
        id: null,
        name: null,
        membership_date: null,
        membership_due: null,
        company_size: null,
        gold_member: false,
      },
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'membership_date',
          sortable: true,
          sortByFormatted: true,
          formatter: (val) => {
            return moment(val).format('YYYY/MM/DD')
          },
        },
        {
          key: 'membership_due',
          sortable: true,
          sortByFormatted: true,
          formatter: (val) => {
            return moment(val).format('YYYY/MM/DD')
          },
        },
        {
          key: 'company_size',
          sortable: true,
        },
        {
          key: 'gold_member',
          sortable: true,
        },
        { key: 'edit', label: '' },
        { key: 'remove', label: '' },
      ],
    }
  },

  mixins: [filters],
  computed: {
    ...mapState(['factories', 'units']),
    factoryList() {
      return this.factories.list
    },
  },
  methods: {
    ...mapActions([
      'fetchFactoryList',
      'editFactory',
      'removeFactory',
      'addNewFactory',
    ]),
    // open edit modal
    showEditModal(item) {
      this.form = item
      this.modal.type = 'edit'
      this.$bvModal.show('input-modal')
    },
    // open remove modal
    showRemoveModal(item) {
      this.form = item
      this.$bvModal.show('delete-modal')
    },
    showCreateModal() {
      this.modal.type = 'create'
      this.form = {
        id: null,
        name: null,
        membership_date: null,
        membership_due: null,
        company_size: null,
        gold_member: false,
      }

      this.$bvModal.show('input-modal')
    },
  },
  mounted() {
    this.fetchFactoryList()
  },

  watch: {
    factories: () => {
      this.fetchFactoryList()
    },
  },
}
</script>

<style lang="scss">
.vertical-nav {
  height: 100vh;
  border-right: 1px solid #e8e8e8;
}

.sr-only {
  display: none !important;
}
</style>
