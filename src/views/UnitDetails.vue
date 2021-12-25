<template>
  <div class="dashboard">
    <b-row>
      <!-- Vertical Nav -->
      <b-col cols="2">
        <vertical-nav />
      </b-col>
      <!-- Dashboard -->
      <b-col cols="10">
        <b-container class="mx-0 my-3">
          <!-- factory select -->
          <b-form-select v-model="selectedFactoryId">
            <b-form-select-option :value="null" disabled
              >{{ $t('Please select a factory to display units!') }}</b-form-select-option
            >
            <b-form-select-option
              v-for="factory in factories.list"
              :value="factory.id"
              :key="factory.id"
              >{{ factory.name }}</b-form-select-option
            >
          </b-form-select>
        </b-container>
        <b-container v-if="selectedFactoryId !== null">
          <b-table hover :items="unitList" :fields="fields" ref="table">
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
          <!-- NEW UNIT BTN -->
          <b-btn class="bg-success my-3" @click="showCreateModal"
            >{{$t('Create New Unit')}}</b-btn
          >
        </b-container>
      </b-col>
    </b-row>

    <!-- EDIT MODAL -->
    <delete-modal id="delete-modal" :form="form" target="unit" />
    <unit-input-modal :type="modal.type" id="unit-input-modal" :form="form" />
  </div>
</template>

<script>
// import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import filters from '../mixins/filters'
import UnitInputModal from '../components/unit-input-modal/UnitInputModal.vue'
import DeleteModal from '../components/delete-modal/DeleteModal.vue'
import VerticalNav from '../components/vertical-nav/VerticalNav.vue'

export default {
  components: { UnitInputModal, DeleteModal, VerticalNav },
  name: 'UnitDetails',
  data() {
    return {
      modal: {
        type: 'edit',
      },
      selectedFactoryId: null,
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
          key: 'unit_name',
          label: this.$i18n.t('Unit Name'),
          sortable: true,
        },
        {
          key: 'date_start',
          label: this.$i18n.t('Period Start'),

          sortable: true,
          sortByFormatted: true,
        },
        {
          key: 'date_end',
          label: this.$i18n.t('Period End'),
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: 'usage',
          label: this.$i18n.t('Usage kWh'),
          sortable: true,
        },
        {
          key: 'usage_fee',
          label: this.$i18n.t('Total Amount $'),
          sortable: true,
        },
        {
          key: 'discount',
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
    unitList() {
      return this.units.list.map((item) => {
        const newObj = {}
        newObj.date_start = item.date_range.split(',')[0].slice(1)
        newObj.date_end = item.date_range.split(',')[1].slice(0, 10)
        return { ...item, ...newObj }
      })
    },
  },
  methods: {
    ...mapActions(['fetchFactoryList', 'fetchUnitList']),
    // open edit modal
    showEditModal(item) {
      this.form = item
      this.modal.type = 'edit'
      this.$bvModal.show('unit-input-modal')
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
        unit_name: null,
        factory_id: this.selectedFactoryId,
        date_start: null,
        date_end: null,
        usage: null,
        usage_fee: null,
        discount: false,
      }

      this.$bvModal.show('unit-input-modal')
    },
  },
  mounted() {
    this.fetchFactoryList()
  },

  watch: {
    selectedFactoryId(val) {
      this.fetchUnitList(val)
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
