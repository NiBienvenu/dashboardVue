<!-- components/EstimatesChart.vue -->
<template>
    <div class="chart-container">
      <apexchart
        type="line"
        height="300"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  })
  
  const series = computed(() => [{
    name: 'Estimates',
    data: props.data.map(item => item.value)
  }])
  
  const chartOptions = computed(() => ({
    chart: {
      type: 'line',
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: props.data.map(item => item.month)
    },
    yaxis: {
      min: 0,
      max: 1,
      tickAmount: 4
    },
    colors: ['#ff9800'],
    grid: {
      borderColor: '#f1f1f1',
    }
  }))
  </script>
  
  <style>
  .chart-container {
    height: 300px;
    width: 100%;
  }
  </style>