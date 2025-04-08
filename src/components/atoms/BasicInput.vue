<script setup lang="ts">

interface enhed {
  navn: string,
  description: string,
  syncId: string,
  id: string,
  parent: mappe.id | null,
}
interface mappe {
  id: string,
  navn: string,
  parent: mappe.id | null,
}

const mapper = [
  {
    navn: 'M_A',
    parent: null,
  },{
    navn: 'M_B',
    parent: null,
  },{
    navn: 'M_C',
    parent: 'M_B',
  },{
    navn: 'M_D',
    parent: 'M_B',
  },
];
const enheder = [
  {
    navn: 'E_A',
    parent: null,
  },{
    navn: 'E_B',
    parent: null,
  },{
    navn: 'E_C',
    parent: 'M_A',
  },{
    navn: 'E_D',
    parent: 'M_A',
  },{
    navn: 'E_E',
    parent: 'M_C',
  },{
    navn: 'E_F',
    parent: 'M_C',
  },
];

const items = {
  enhed: [
    {
      navn: 'E_A',
      descipt: '',
    },
    {
      navn: 'E_B',
      descipt: '',
    },
  ],
  mapper: [
    {
      navn: 'M_A',
      enhed: [
        {
          navn: 'E_C',
          descipt: '',
        },
        {
          navn: 'E_D',
          descipt: '',
        },
      ],
      mapper: [],
    },
    {
      navn: 'M_B',
      enhed: [],
      mapper: [
        {
          navn: 'M_C',
          enhed: [
            {
              navn: 'E_E',
              descipt: '',
            },
            {
              navn: 'E_F',
              descipt: '',
            },
          ],
          mapper: [],
        },
        {
          navn: 'M_D',
          enhed: [],
          mapper: [],
        },
      ],
    },
  ],
};


</script>

<template>
  <div>
    <input type="text">
  </div>
</template>

<style scoped lang="scss">

</style>
