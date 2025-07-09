<template lang="">

					<div class="page-header">
						<div class="add-item d-flex">
							<div class="page-title">
								<h4>Roles &amp; Permission</h4>
								<h6>Manage your roles</h6>
							</div>
						</div>
						<ul class="table-top-head">
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Pdf" data-bs-original-title="Pdf"><img :src="url + '/assets/img/icons/pdf.svg'" alt="img"></a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Excel" data-bs-original-title="Excel"><img :src="url + '/assets/img/icons/excel.svg'" alt="img"></a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Refresh" data-bs-original-title="Refresh"><i class="ti ti-refresh"></i></a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" id="collapse-header" aria-label="Collapse" data-bs-original-title="Collapse"><i class="ti ti-chevron-up"></i></a>
							</li>
						</ul>
						<div class="page-btn">
							<a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-role"><i class="ti ti-circle-plus me-1"></i>Add Role</a>
						</div>
					</div> 
					
					<div class="card">
						<div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<div class="search-set">
								<div class="search-input">
									<span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
								<div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input type="search" class="form-control form-control-sm" placeholder="Search" aria-controls="DataTables_Table_0"></label></div></div>
							</div>
							<div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
								<div class="dropdown">
									<a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
										Status
									</a>
									<ul class="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="javascript:void(0);" class="dropdown-item rounded-1">Active</a>
										</li>
										<li>
											<a href="javascript:void(0);" class="dropdown-item rounded-1">Inactive</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="card-body p-0">
							<div class="table-responsive">
								<div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer table-responsive"><table class="table datatable dataTable no-footer" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
									<thead class="thead-light">
										<tr><th class="no-sort sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="
												
													
												
											: activate to sort column descending" style="width: 56.2031px;">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox" id="select-all">
												</div>
											</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Role: activate to sort column ascending" style="width: 195.383px;">Role</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created Date: activate to sort column ascending" style="width: 153.445px;">Created Date</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style="width: 100.445px;">Status</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style="width: 186.523px;"></th></tr>
									</thead>
									<tbody>
										
										
										
										
										
										
										
										
										
										
									<tr class="odd">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Admin</td>
											<td>12 Sep 2024 </td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="even">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Manager</td>
											<td>24 Oct 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="odd">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Salesman</td>
											<td>18 Feb 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="even">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Supervisor</td>
											<td>17 Oct 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="odd">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Store Keeper</td>
											<td>20 Jul 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="even">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Inventory Manager</td>
											<td>10 Apr 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="odd">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Delivery Biker</td>
											<td>29 Aug 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="even">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Employee</td>
											<td>22 Feb 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="odd">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Cashier</td>
											<td>03 Nov 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr><tr class="even">
											<td class="sorting_1">
												<div class="form-check form-check-md">
													<input class="form-check-input" type="checkbox">
												</div>
											</td>
											<td>Quality Analyst</td>
											<td>17 Dec 2024</td>
											<td>
												<span class="badge badge-success d-inline-flex align-items-center badge-xs">
													<i class="ti ti-point-filled me-1"></i>Active
												</span>
											</td>
											<td>
												<div class="action-icon d-inline-flex">
													<a href="permissions.html" class="me-2 d-flex align-items-center p-2 border rounded"><i class="ti ti-shield"></i></a>
													<a href="#" class="me-2 d-flex align-items-center p-2 border rounded" data-bs-toggle="modal" data-bs-target="#edit-role"><i class="ti ti-edit"></i></a>
													<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" class=" d-flex align-items-center p-2 border rounded"><i class="ti ti-trash"></i></a>
												</div>
											</td>
										</tr></tbody>
								</table>
                                
                                </div>
                               
                               <div class="d-flex">
                                    <div class=" p-2 d-flex align-items-center ">
                                           
                                                <label class="me-2"> ສະແດງ</label>
                                                <select class="form-select form-select-sm me-2">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select> 
                                                <div class=" text-nowrap "  role="status" aria-live="polite">1 - 10 of 10 items</div>
                                          
                                        </div>
                                        <div class="w-100">
                                            <div class="dataTables_paginate d-flex justify-content-end" >
                                                <ul class="pagination">
                                                    <li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                        <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">
                                                            <i class="fa fa-angle-left"></i> 
                                                        </a>
                                                    </li>
                                                    <li class="paginate_button page-item active">
                                                        <a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1
                                                        </a>
                                                    </li>
                                                    <li class="paginate_button page-item next disabled" id="DataTables_Table_0_next"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next" tabindex="-1" class="page-link"> 
                                                        <i class=" fa fa-angle-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
                                <!-- <div class="dataTables_length" id="DataTables_Table_0_length"><label>Row Per Page <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select form-select-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> Entries</label></div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link"><i class="fa fa-angle-left"></i> </a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item next disabled" id="DataTables_Table_0_next"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next" tabindex="-1" class="page-link"> <i class=" fa fa-angle-right"></i></a></li></ul></div><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">1 - 10 of 10 items</div> -->
                            
                            </div>
							
						</div>
					</div>
					<!-- /product list -->

                    <!-- Add Role -->
		<div class="modal fade" id="add-role">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<div class="page-title">
							<h4>Create Role</h4>
						</div>
						<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form action="roles-permissions.html">
						<div class="modal-body">
								<div class="mb-3">
									<label class="form-label">Role Name</label>
									<input type="text" class="form-control">
								</div>
								<div class="d-flex align-items-center justify-content-between">
									<label class="form-label">Status</label>
									<label class="switch">
										<input type="checkbox" checked>
										<span class="slider round"></span>
									</label>
								</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
							<button type="submit" class="btn btn-primary">Create Role</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- /Add Role -->
			
</template>
<script>
export default {
    data() {
        return {
            url:window.location.origin,
        }
    },
}
</script>
<style lang="">
    
</style>