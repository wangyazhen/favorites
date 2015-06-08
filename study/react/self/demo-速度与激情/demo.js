/*
*	Adjacent JSX elements must be wrapped in an enclosing tag
   return 之后 必须包含一个包裹标签
*/

var DemoComponent = React.createClass({
	getInitialState: function(){
		return {
			title: '我喜欢的电影',
            movies: this.props.movies
		};
	},
	componentWillMount: function() {
		console.info('组件组件装配前执行');				
	},
	componentDidMount: function() {
		console.info('组件启动完成后执行');		
	},
	onRemove: function(movie, index) {
		//alert(movie.id + '' + index );
		var movies = this.state.movies;
		movies.splice(index, 1);
		this.setState({
			movies: movies
		});
	},
	onAdd: function(e) {
		e.preventDefault();
		
		var nameValue = React.findDOMNode(this.refs.name).value;
		var dateValue = React.findDOMNode(this.refs.date).value;
		if (!nameValue){
			return alert('请输入电影名');
		}
		if (!dateValue) {
			return alert('请输入电影日期');	
		}
		console.log(nameValue +'*******' + dateValue);
		var movies = this.state.movies;
		movies.push({
				name: nameValue,
				date: dateValue,
				id: Date.now() // 粗暴的暂且以时间为id
			});
		this.setState({
			movies: movies
		});
	},
	render: function() {
		var title = this.state.title;
		var self = this;
		/* 这里onRemove 如果不绑定 null 就会有问题 立即执行 */
		var movies = this.state.movies.map(function(movie, index) {
			return (
				<li className="movie-item" key={movie.id}>
					<span className='movie-name'>{movie.name}</span>
					<span className="movie-date">{movie.date}</span>
					<a href='#' onClick={self.onRemove.bind(null,movie, index)}>删除</a>
				</li>
			);
		});
		return (
			<div className='component-hello'>
				<h1> Hello React</h1>
				<p  className="hello-desc">React 初探</p>
				<div className="Hello-movies">
					<h2>{title}</h2>
					<form onSubmit={this.onAdd}>
						<input type='text' ref='name' placeholder='输入你喜欢的电影'/>&nbsp;
						<input type="text" ref="date" placeholder="上映时间"/>&nbsp;
                        <input type="submit" value="提交"/>
					</form>
					<ul>{movies}</ul>
				</div>
      		</div>
		);
	}
});

var moviesData = [
                {
                    id: 7,
                    name: '速度与激情7 ',
                    date: 2015
                },
                {
                    id: 6,
                    name: '速度与激情6 ',
                    date: 2013
                },
                {
                    id: 5,
                    name: '速度与激情5 ',
                    date: 2010
                }
            ];
// 插入html指定位置
React.render(<DemoComponent movies={moviesData}/>, document.getElementById('demo'));