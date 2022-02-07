export default function suite() {
	// DELETE A LIST NOT OWNED NOT GRANTED -> Fail
	// DELETE A LIST NOT OWNED BUT GRANTED -> Success Forget
	// DELETE A LIST MULTIPLE OWNED -> Success Forget
	// DELETE A LIST SINGLE OWNED -> Success Delete
}
