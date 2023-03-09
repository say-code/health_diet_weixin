Page({
  data: {
    consignee: '',
    phone: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    detail: '',
    label: '',
    isDefault: false
  },


  switch(e) {
    console.log(e)
    this.data.isDefault = e.detail.value
    console.log(this.data)
  }
})