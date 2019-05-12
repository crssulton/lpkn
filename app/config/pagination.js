export function getNextData(){
  	const self = this;
  	this.setState({loading: true})
    fetch(this.state.next, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          pendaftars: data.results,
          numPage: data.num_pages,
          dataCount: data.count,
          next: data.next,
          previous: data.previous,
          loading: !self.state.loading
        });
      });
  }

  export function getPreviousData(){
  	const self = this;
  	this.setState({loading: true})
    fetch(this.state.previous, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          pendaftars: data.results,
          numPage: data.num_pages,
          dataCount: data.count,
          next: data.next,
          previous: data.previous,
          loading: !self.state.loading
        });
      });
  }
