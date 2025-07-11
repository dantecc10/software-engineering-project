<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Calendario - Cash Flow</title>
    <meta property="og:type" content="website">
    <meta name="description" content="Controla tus ingresos y gastos de manera simple y rápida. Una herramienta diseñada para estudiantes y personas que quieren mejorar su administración financiera del día a día.">
    <link rel="stylesheet" href="{{ asset('assets/bootstrap/css/bootstrap.min.css?h=2b9089ac3d02cc1e1b2f6684859260ec') }}">
    <link rel="stylesheet" href="{{ asset('https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bss-overrides.css?h=75572ffee0351e7b945b40fd2abf550b') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/cashflow.css?h=e5cfa6c463d89d91dacf6be0dd89f93d') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <!-- Start: Navbar Centered Links -->
    <nav class="navbar navbar-expand-md fixed-top py-3 navbar-shrink" id="mainNav">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="{{ asset('/') }}"><span>Cash Flow</span></a>
            <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
                <span class="visually-hidden">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item"><a class="nav-link" href="{{ asset('/index') }}">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ asset('calendar') }}">Calendario</a></li>
                </ul>
                @php
                $user = null;
                if(session('user_id')) {
                    $user = \App\Models\PlatformUsers::find(session('user_id'));
                }
                @endphp
                @if($user)
                <div class="dropdown">
                    <button class="btn btn-primary shadow dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        {{ $user->name }}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="{{ url('/profile') }}">Modificar perfil</a></li>
                        <li>
                            <form method="POST" action="{{ url('/logout') }}">
                                @csrf
                                <button class="dropdown-item" type="submit">Salir</button>
                            </form>
                        </li>
                    </ul>
                </div>
                @else
                <a class="btn btn-primary shadow" role="button" href="{{ asset('login') }}">Iniciar sesión</a>
                @endif
            </div>
        </div>
    </nav><!-- End: Navbar Centered Links -->
    <section class="mt-5 py-5">
        <!-- Start: Testimonials -->
        <div class="container py-5">
            <div class="row mb-5">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h2 class="fw-bold">Revisa tus<br><span class="pb-2 underline">gastos</span>&nbsp;e ingresos</h2>
                </div>
            </div>
            <div class="row">
                <div class="col"></div>
            </div>
        </div><!-- End: Testimonials -->
        <div class="container calendar-container">
            <!-- Simbología visual, NO tabla -->
            <div class="row justify-content-center mb-3">
                <div class="col-md-8 d-flex justify-content-center">
                    <div style="display:flex;gap:2rem;align-items:center;">
                        <span>
                            <span style="display:inline-block;width:0;height:0;
                                border-left:12px solid transparent;
                                border-right:12px solid transparent;
                                border-bottom:18px solid #28a745;
                                vertical-align:middle;margin-right:6px;"></span>
                            <span style="vertical-align:middle;">Ingreso registrado</span>
                        </span>
                        <span>
                            <span style="display:inline-block;width:0;height:0;
                                border-left:12px solid transparent;
                                border-right:12px solid transparent;
                                border-bottom:18px solid #dc3545;
                                vertical-align:middle;margin-right:6px;"></span>
                            <span style="vertical-align:middle;">Egreso registrado</span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- Fin simbología -->
            <div class="row justify-content-center">
                <div class="col col-md-6 text-center mb-5">
                    <h3>Calendario</h3>
                </div>
            </div>
            <div class="row">
                <div class="col col-md-12">
                    <div class="d-md-flex elegant-calendar">
                        <div class="d-flex align-items-center wrap-header img" style="background-image: url('https://preview.colorlib.com/theme/bootstrap/calendar-07/images/bg.jpg')">
                            <p id="reset">Today</p>
                            <div class="p-0" id="header">
                                <div class="head-info">
                                    <div class="head-month"><span>June - 2025</span></div>
                                    <div class="head-day"><span>29</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="calendar-wrap">
                            <div class="w-100 button-wrap">
                                <div class="d-flex justify-content-center align-items-center pre-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em" fill="currentColor">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                                        <path d="M48 416c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80c-8.8 0-16 7.2-16 16l0 320zm16 64c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480zm64-224c0-6.7 2.8-13 7.7-17.6l112-104c7-6.5 17.2-8.2 25.9-4.4s14.4 12.5 14.4 22l0 208c0 9.5-5.7 18.2-14.4 22s-18.9 2.1-25.9-4.4l-112-104c-4.9-4.5-7.7-10.9-7.7-17.6z"></path>
                                    </svg></div>
                                <div class="d-flex justify-content-center align-items-center next-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em" fill="currentColor">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                                        <path d="M400 96c0-8.8-7.2-16-16-16L64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320zM384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z"></path>
                                    </svg></div>
                            </div>
                            <div class="table-responsive">
                                <table class="table" id="calendar">
                                    <thead>
                                        <tr>
                                            <th>Dom</th>
                                            <th>Lun</th>
                                            <th>Mar</th>
                                            <th>Mie</th>
                                            <th>Jue</th>
                                            <th>Vie</th>
                                            <th>Sáb</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>10</td>
                                            <td>11</td>
                                            <td>12</td>
                                            <td>13</td>
                                            <td>14</td>
                                        </tr>
                                        <tr>
                                            <td>15</td>
                                            <td>16</td>
                                            <td>17</td>
                                            <td>18</td>
                                            <td>19</td>
                                            <td>20</td>
                                            <td>21</td>
                                        </tr>
                                        <tr>
                                            <td>22</td>
                                            <td>23</td>
                                            <td>24</td>
                                            <td>25</td>
                                            <td>26</td>
                                            <td>27</td>
                                            <td>28</td>
                                        </tr>
                                        <tr>
                                            <td>29</td>
                                            <td>30</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal de detalle con pestañas -->
        <div class="modal fade" role="dialog" tabindex="-1" id="detailModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title fw-bolder" id="detailModalTitle">Detalle del día</h4>
                        <button class="btn-close" type="button" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs mb-3" id="detailTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="tab-balance" data-bs-toggle="tab" data-bs-target="#tabContent-balance" type="button" role="tab">Balance</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="tab-incomes" data-bs-toggle="tab" data-bs-target="#tabContent-incomes" type="button" role="tab">Ingresos</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="tab-expenses" data-bs-toggle="tab" data-bs-target="#tabContent-expenses" type="button" role="tab">Egresos</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="tab-add" data-bs-toggle="tab" data-bs-target="#tabContent-add" type="button" role="tab">Añadir</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="detailTabContent">
                            <div class="tab-pane fade show active" id="tabContent-balance" role="tabpanel">
                                <div id="balanceMessage" class="mb-2"></div>
                                <div class="my-3 text-center">
                                    <canvas id="detailPieChart" width="200" height="200"></canvas>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="tabContent-incomes" role="tabpanel">
                                <ul id="incomesList"></ul>
                            </div>
                            <div class="tab-pane fade" id="tabContent-expenses" role="tabpanel">
                                <ul id="expensesList"></ul>
                            </div>
                            <div class="tab-pane fade" id="tabContent-add" role="tabpanel">
                                <div class="d-flex flex-column gap-2 align-items-center">
                                    <button class="btn btn-success w-75" id="addIncomeBtn">Añadir ingreso</button>
                                    <button class="btn btn-danger w-75" id="addExpenseBtn">Añadir egreso</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" id="detailModalFooter">
                        <button class="btn btn-light" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: Añadir Ingreso -->
        <div class="modal fade" id="addIncomeModal" tabindex="-1" aria-labelledby="addIncomeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form id="addIncomeForm" class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addIncomeModalLabel">Añadir ingreso</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="income-date" class="form-label">Fecha</label>
                            <input type="date" class="form-control" id="income-date" name="date" required>
                        </div>
                        <div class="mb-3">
                            <label for="income-type" class="form-label">Tipo</label>
                            <input type="text" class="form-control" id="income-type" name="type" maxlength="50" required>
                        </div>
                        <div class="mb-3">
                            <label for="income-amount" class="form-label">Cantidad</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="income-amount" name="amount" step="0.01" min="0" required>
                                <span class="input-group-text">$</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-success">Guardar ingreso</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Modal: Añadir Egreso -->
        <div class="modal fade" id="addExpenseModal" tabindex="-1" aria-labelledby="addExpenseModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form id="addExpenseForm" class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addExpenseModalLabel">Añadir egreso</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="expense-date" class="form-label">Fecha</label>
                            <input type="date" class="form-control" id="expense-date" name="date" required>
                        </div>
                        <div class="mb-3">
                            <label for="expense-category" class="form-label">Categoría</label>
                            <select class="form-select" id="expense-category" name="category_id" required>
                                <option value="">Selecciona una categoría</option>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->category_id }}">{{ $cat->category_name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="expense-description" class="form-label">Descripción</label>
                            <input type="text" class="form-control" id="expense-description" name="description" maxlength="255" required>
                        </div>
                        <div class="mb-3">
                            <label for="expense-amount" class="form-label">Cantidad</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="expense-amount" name="amount" step="0.01" min="0" required>
                                <span class="input-group-text">$</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="expense-frequency" class="form-label">Frecuencia</label>
                            <select class="form-select" id="expense-frequency" name="frequency_id" required>
                                <option value="">Selecciona una frecuencia</option>
                                @foreach($frequencies as $freq)
                                    <option value="{{ $freq->frequency_id }}" data-name="{{ $freq->frequency_name }}">{{ $freq->frequency_name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3" id="expense-next-date-group">
                            <label for="expense-next-date" class="form-label">Próxima fecha</label>
                            <input type="date" class="form-control" id="expense-next-date" name="next_date">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-danger">Guardar egreso</button>
                    </div>
                </form>
            </div>
        </div>
    </section><!-- Start: Footer Multi Column -->
    <footer>
        <div class="container py-4 py-lg-5">
            <div class="row row-cols-2 row-cols-md-4">
                <!-- Start: Social Icons -->
                <div class="col-12 col-md-4">
                    <div class="fw-bold d-flex align-items-center mb-2"><span>Cash Flow</span></div>
                    <p class="text-muted">Toma el control de tus gastos e ingresos y administra mejor tus finanzas.</p>
                </div><!-- End: Social Icons -->
                <!-- Start: Services -->
                <div class="col-sm col-md-4 text-lg-start d-flex flex-column">
                    <h3 class="fs-6 fw-bold">Accesos rápidos</h3>
                    <ul class="list-unstyled">
                        <li><a href="{{ asset('#') }}">Calendario</a></li>
                        <li><a href="{{ asset('#') }}">Registro</a></li>
                        <li><a href="{{ asset('#') }}">Ayuda</a></li>
                    </ul>
                </div><!-- End: Services -->
                <!-- Start: About -->
                <div class="col-sm col-md-4 text-lg-start d-flex flex-column">
                    <h3 class="fs-6 fw-bold">About</h3>
                    <ul class="list-unstyled">
                        <li><a href="{{ asset('#') }}">Equipo</a></li>
                        <li><a href="{{ asset('#') }}">Legal</a></li>
                    </ul>
                </div><!-- End: About -->
            </div>
            <hr>
            <div class="text-muted d-flex justify-content-between align-items-center pt-3">
                <p class="mb-0">Copyright © 2025 Cash Flow</p>
                <ul class="list-inline mb-0">
                    <li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-facebook">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"></path>
                        </svg></li>
                    <li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-twitter">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15"></path>
                        </svg></li>
                    <li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-instagram">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path>
                        </svg></li>
                </ul>
            </div>
        </div>
    </footer><!-- End: Footer Multi Column -->
    <script src="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js') }}"></script>
    <script src="{{ asset('https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js') }}"></script>
    <script src="{{ asset('https://cdn.jsdelivr.net/npm/chart.js') }}"></script>
    <script src="{{ asset('assets/js/calendar.js?...') }}"></script>
    <script src="{{ asset('assets/js/icalendar.js?...') }}"></script>
    <script src="{{ asset('assets/js/ops.js?h=aabd161094d0ba3a8604ce2e6b96e251') }}"></script>
    <script src="{{ asset('assets/js/startup-modern.js?h=860a1ecddc64fd24c02f2fc109343dbd') }}"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Mostrar/ocultar próxima fecha según frecuencia
        const freq = document.getElementById('expense-frequency');
        const nextDateGroup = document.getElementById('expense-next-date-group');
        function toggleNextDate() {
            // Detecta por nombre, no solo por valor
            const selected = freq.options[freq.selectedIndex];
            const freqName = selected ? selected.getAttribute('data-name') : '';
            if (freqName === 'Única vez') {
                nextDateGroup.style.display = 'none';
                document.getElementById('expense-next-date').value = '';
            } else {
                nextDateGroup.style.display = '';
            }
        }
        freq.addEventListener('change', toggleNextDate);
        toggleNextDate();

        // Convertir IDs a número antes de enviar el formulario de egreso
        const expenseForm = document.getElementById('addExpenseForm');
        expenseForm.addEventListener('submit', function(e) {
            // Convierte category_id y frequency_id a número
            const catSelect = document.getElementById('expense-category');
            const freqSelect = document.getElementById('expense-frequency');
            if (catSelect && catSelect.value) {
                catSelect.value = parseInt(catSelect.value, 10);
            }
            if (freqSelect && freqSelect.value) {
                freqSelect.value = parseInt(freqSelect.value, 10);
            }
        });
    });
    </script>
</body>

</html>