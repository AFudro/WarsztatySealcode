function bin(x) {
    var r="";
	if( x==0 ) {
		return '0';
	}
    while(x!=0) {
		if( x%2==0 ) {
			r = '0'+r;
		}
		else {
			r = '1'+r;
		}
		x=Math.floor(x/2);
	}
	return r;
}
