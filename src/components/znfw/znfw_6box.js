class Znfw6Box {
	constructor(dom) {
		this.$dom = $(dom);
	}

	setConfig(value) {
		this._config = value;
	}

	setDataProvider(value) {
		this._dataProvider = value;
		this.creationContent();
	}

	creationContent() {
		let str = '';
		for (let i = 0; i < this._dataProvider.length; i++) {
			let item = this._dataProvider[i];
			str += '<div class="boxchart'+(i+1)+'">' +
				'<div class="clearfix">' +
				'<span class="c-unit fr">' + item.unit + '</span>' +
				'<span class="c-value fr">' + item.start + '</span>' +
				'<p class="c-name fr">' + item.seriesName + '由</p>' +
				'</div>' +
				'<div class="clearfix">' +
				'<span class="d-unit fr">' + item.unit + '</span>' +
				'<p class="d-value ' + (item.start > item.end ? 'fall' : 'add') + ' fr" data-end="' + item.end + '">' + item.start + '</p>' +
				'</div>' +
				'</div>';
		}
		this.$dom.html(str);
	}

}

module.exports = Znfw6Box;