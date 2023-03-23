const req = require('../../../../utils/request');


Page({
  data: {
    id: '',
    consignee: '',
    phone: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    detail: '',
    label: '',
    isDefault: false,
    checked: false,
    sex: 0
  },


  onLoad(event) {
    console.log(event);
    let id = event.id;
    console.log(id);
    if (id) {
      req.get("/addressBook/" + id).then(
        (res) => {
          this.setData({
            id: id,
            consignee: res.data.consignee,
            phone: res.data.phone,
            provinceName: res.data.provinceName,
            cityName: res.data.cityName,
            districtName: res.data.districtName,
            detail: res.data.detail,
            label: res.data.label,
            isDefault: res.data.isDefault === 1 ? true : false,
            sex: res.data.sex
          })
        }
      )
    };
  },



  switch(e) {
    console.log(e)
    this.data.isDefault = e.detail.value
    console.log(this.data)
  },

  formSubmit() {
    if (this.data.isDefault) {
      req.put("/addressBook/default", {
        data: {
          id: this.data.id,
          consignee: this.data.consignee,
          phone: this.data.phone,
          provinceName: this.data.provinceName,
          cityName: this.data.cityName,
          districtName: this.data.districtName,
          detail: this.data.detail,
          label: this.data.label,
          sex: this.data.sex
        }
      }).then((res) => {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      })

    }
    else {
      req.post("/addressBook", {
        data: {
          id: this.data.id,
          consignee: this.data.consignee,
          phone: this.data.phone,
          provinceName: this.data.provinceName,
          cityName: this.data.cityName,
          districtName: this.data.districtName,
          detail: this.data.detail,
          label: this.data.label,
          sex: this.data.sex,
          isDefault: 0
        }
      }).then((res) => {
        wx / wx.showToast({
          title: '保存成功',
        });
        setTimeout(() => {
          wx.navigateBack()
          console.log(1)
        }, 2000)

      })
    }

  },
  handleChange(e) {
    const { value } = e.detail
    this.setData({ sex: value });
  },

});